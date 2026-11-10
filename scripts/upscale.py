"""Upscales a picture 4x with Real-ESRGAN, on the CPU, for when a source is smaller than the site
shows it. The hero's gate starts with it, before scripts/repaint.py paints it again at 4K:

    python3 scripts/upscale.py forest-gate.jpg RealESRGAN_x4plus.pth gate-x4.png --crop 225,228,584

- forest-gate.jpg is the app icon's painting (PlayableAnime app/tool/app_icon/forest-gate.jpg).
  Gemini painted the scene on an inner panel of the 1024 px square, and --crop takes that panel:
  584 px from (225, 228), as the app icon does (app/tool/app_icon/icon.svg).
- RealESRGAN_x4plus.pth is Real-ESRGAN's general model (BSD-3-Clause), from
  https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth
  (SHA-256 4fa0d38905f75ac06eb49a7951b426670021be3018265fd191d2125df9d682f1). It sharpens edges
  and undoes JPEG blur while keeping the painted texture. The anime model
  (RealESRGAN_x4plus_anime_6B) was tried too: it flattens the bark and the mist into cel shading.

Needs PyTorch, Spandrel and Pillow (pip install torch spandrel pillow). Spandrel reads only the
model's weights, never code from the file. A 584 px picture takes about a minute and a half on
four CPU cores.
"""

import argparse

import numpy as np
import torch
from PIL import Image
from spandrel import ImageModelDescriptor, ModelLoader

TILE = 256  # pixels of the source per step, so memory stays small
PAD = 16  # overlap around each tile, so the seams don't show


def upscale(image: Image.Image, model: ImageModelDescriptor) -> Image.Image:
    pixels = np.asarray(image.convert("RGB"), dtype=np.float32) / 255.0
    source = torch.from_numpy(pixels).permute(2, 0, 1).unsqueeze(0)
    scale = model.scale
    _, _, height, width = source.shape
    result = torch.zeros(1, 3, height * scale, width * scale)
    with torch.inference_mode():
        for y in range(0, height, TILE):
            for x in range(0, width, TILE):
                y0, x0 = max(y - PAD, 0), max(x - PAD, 0)
                y1, x1 = min(y + TILE + PAD, height), min(x + TILE + PAD, width)
                piece = model(source[:, :, y0:y1, x0:x1])
                th, tw = min(TILE, height - y) * scale, min(TILE, width - x) * scale
                oy, ox = (y - y0) * scale, (x - x0) * scale
                result[:, :, y * scale : y * scale + th, x * scale : x * scale + tw] = piece[
                    :, :, oy : oy + th, ox : ox + tw
                ]
    out = result.squeeze(0).permute(1, 2, 0).clamp(0, 1).numpy()
    return Image.fromarray((out * 255.0).round().astype(np.uint8))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("source")
    parser.add_argument("weights")
    parser.add_argument("output")
    parser.add_argument("--crop", help="left,top,size: a square to take from the source first")
    args = parser.parse_args()
    image = Image.open(args.source)
    if args.crop:
        left, top, size = (int(n) for n in args.crop.split(","))
        image = image.crop((left, top, left + size, top + size))
    model = ModelLoader().load_from_file(args.weights)
    if not isinstance(model, ImageModelDescriptor):
        raise SystemExit(f"{args.weights} is not an image-to-image model")
    model.eval()
    result = upscale(image, model)
    result.save(args.output)
    print(f"{args.output}  {result.width}x{result.height}")


if __name__ == "__main__":
    main()
