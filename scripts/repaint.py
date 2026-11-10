"""Repaints a picture at 4K with Gemini on Vertex AI, keeping its design. The hero's gate was made
with it (scripts/prepare_images.py, gate.png), in four steps after scripts/upscale.py:

    python3 scripts/repaint.py gate-x4.png out --variant faithful --model gemini-3-pro-image
    python3 scripts/repaint.py gate-x4.png out --variant fresh --model gemini-nano-banana-2.1
    python3 scripts/repaint.py out/faithful-gemini-3-pro-image.png out --variant traveller \\
        --model gemini-nano-banana-2.1
    python3 scripts/repaint.py out/fresh-gemini-nano-banana-2.1.png out --variant swap \\
        --traveller out/traveller-gemini-nano-banana-2.1.png --model gemini-nano-banana-2.1

- gate-x4.png is the Real-ESRGAN upscale of the app icon's painting (scripts/upscale.py).
- faithful paints it again at 4096 px with nothing moved, which cleans up the upscale's smudges,
  and traveller then draws its cloaked traveller with more care (robe folds, a buckled satchel,
  cuffed boots, a rim of light).
- fresh paints the same design afresh, with a darker, denser forest of ferns and undergrowth.
- swap keeps fresh's forest and puts traveller's traveller in it, lit by the forest's own light.
  Its picture, out/swap-gemini-nano-banana-2.1.png, is gate.png: Miki picked it from three
  rounds of pictures (2026-11-10).
- Each picture goes to the model as a 2048 px JPEG. Gemini paints a new picture each time, so a
  second run gives a close cousin, not the same file.

It runs in the playable-anime Google Cloud project on Vertex AI's global endpoint and signs in
with Application Default Credentials, or with --gcloud-config NAME, which asks that gcloud
configuration for a short-lived token and keeps it in memory. No keys, and nothing secret is
printed. Each 4K picture is billed to the project.

Needs google-genai and Pillow (pip install google-genai pillow).
"""

from __future__ import annotations

import argparse
import io
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image

PROJECT = os.environ.get("GCP_PROJECT", "").strip() or "playable-anime"
LOCATION = os.environ.get("VERTEX_LOCATION", "").strip() or "global"
REFERENCE_PX = 2048

# Image models that paint 4K on Vertex AI's global endpoint (checked 2026-11-10), best first.
MODELS = ["gemini-3-pro-image", "gemini-nano-banana-2.1"]

STYLE = (
    "Painterly anime key-art style, cinematic low-key lighting, deep ink-blue night tones with one "
    "strong warm gold accent. No text, no letters, no logos, no watermark, no border, no frame."
)

VARIANTS = {
    # The same picture, only sharper: nothing moves, nothing is added.
    "faithful": (
        "Recreate this exact painting as a crisp, high-resolution 4K image. Keep everything "
        "exactly where it is: the glowing golden doorway, the small cloaked traveller stepping "
        "through it, every tree trunk and branch, the mist, the light rays, the colours and the "
        "lighting. Do not add, remove, move or restyle anything, and keep the same framing. Only "
        "resolve the soft, blurry areas into clean, fine painterly detail with sharp edges, as if "
        "the original artist had painted it at 4K. " + STYLE
    ),
    # Almost the same design, painted afresh at 4K with the picture as the guide.
    "fresh": (
        "Paint this scene again from scratch as a new high-resolution 4K illustration, keeping the "
        "same design and composition as the reference: a glowing doorway of golden light standing "
        "alone in a dark misty forest, a small cloaked traveller about to step through, centred, "
        "with tall dark trees framing it and golden light spilling onto the forest floor. Richer "
        "detail in the bark, the leaves, the mist and the traveller's cloak, and a luminous, "
        "magical glow from the doorway. " + STYLE
    ),
    # The same picture with a better drawn traveller.
    "traveller": (
        "Keep this painting exactly as it is, as a crisp high-resolution 4K image: the same golden "
        "doorway, trees, mist, light, colours and framing, with nothing added, removed or moved. "
        "Improve only the small cloaked traveller walking into the doorway, seen from behind: "
        "make them more defined and beautifully rendered. A clearly shaped hood with a thin rim of "
        "golden light along its edge, soft folds and the texture of heavy ink-blue wool in the "
        "robe, the hem and the shoulders catching the doorway's glow, a worn leather satchel on a "
        "strap across the back, dark trousers and leather boots mid-stride, and a long soft shadow "
        "on the path. The traveller keeps the same size, pose and place, and stays a dark, "
        "readable silhouette against the light. " + STYLE
    ),
    # The scene from --reference with the traveller from --traveller, lit by the scene's own light.
    "swap": (
        "You are given two images. The first image is the scene; the second image shows the "
        "traveller to use. Repaint the first image as a crisp high-resolution 4K painting and keep "
        "its scene exactly as it is: the same glowing golden doorway, the same trees, branches, "
        "roots and foliage, the same mist, fireflies, light rays, colours, darkness and mood, and "
        "the same framing, with nothing added, removed or moved. Change only the small cloaked "
        "traveller walking into the doorway: replace them with the traveller from the second "
        "image, copied faithfully. The same hooded ink-blue cloak with the same shape and soft "
        "folds, the same worn leather satchel with its flap, buckle and rivets on a strap with "
        "metal fittings across the back, the same dark trousers and cuffed leather boots, and the "
        "same stride. Keep the traveller at the place and size of the first image's traveller, "
        "seen from behind, walking into the doorway. Light the traveller only with the first "
        "image's own light, as if they had always been painted in that scene: the doorway's gold "
        "glow as a thin rim of light along the hood, shoulders, cloak hem and boots, the scene's "
        "own cool darkness and mist in the shadows, and a shadow on the path that falls the way "
        "the first image's light makes it fall. Take nothing else from the second image: not its "
        "trees, mist, doorway, background, colours or lighting. " + STYLE
    ),
}


def gcloud_credentials(configuration: str):
    """A short-lived token from a gcloud configuration, kept in memory and never printed."""
    from google.oauth2.credentials import Credentials

    gcloud = shutil.which("gcloud")
    if not gcloud:
        sys.exit("gcloud is not on PATH")
    token = subprocess.run(
        [gcloud, "auth", "print-access-token", f"--configuration={configuration}"],
        capture_output=True,
        text=True,
        check=True,
    ).stdout.strip()
    return Credentials(token)


def as_reference(path: Path) -> bytes:
    """The picture as the model sees it: a JPEG at most 2048 px wide."""
    image = Image.open(path).convert("RGB")
    if image.width > REFERENCE_PX:
        height = round(image.height * REFERENCE_PX / image.width)
        image = image.resize((REFERENCE_PX, height), Image.Resampling.LANCZOS)
    buffer = io.BytesIO()
    image.save(buffer, "JPEG", quality=95)
    return buffer.getvalue()


def paint(
    client: genai.Client, model: str, prompt: str, pictures: list[bytes]
) -> tuple[bytes, str]:
    response = client.models.generate_content(
        model=model,
        contents=[types.Part.from_bytes(data=p, mime_type="image/jpeg") for p in pictures]
        + [prompt],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio="1:1", image_size="4K"),
        ),
    )
    usage = response.usage_metadata
    tokens = f"in {usage.prompt_token_count}, out {usage.candidates_token_count}" if usage else "?"
    for candidate in response.candidates or []:
        for part in candidate.content.parts if candidate.content else []:
            if part.inline_data and part.inline_data.data:
                return part.inline_data.data, tokens
    reasons = [str(c.finish_reason) for c in response.candidates or []]
    raise RuntimeError(f"no picture in the answer (finish: {reasons})")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("reference", type=Path, help="the picture to repaint")
    parser.add_argument("out", type=Path, help="the folder for the new pictures")
    parser.add_argument("--variant", action="append", choices=sorted(VARIANTS))
    parser.add_argument("--traveller", type=Path, help="for swap: the picture to take them from")
    parser.add_argument("--model", action="append", help="defaults to every model in MODELS")
    parser.add_argument("--gcloud-config", help="sign in with this gcloud configuration's token")
    args = parser.parse_args()

    variants = args.variant or ["faithful"]
    if ("swap" in variants) != bool(args.traveller):
        parser.error("--variant swap and --traveller go together")
    reference = as_reference(args.reference)
    traveller = as_reference(args.traveller) if args.traveller else None
    args.out.mkdir(parents=True, exist_ok=True)
    credentials = gcloud_credentials(args.gcloud_config) if args.gcloud_config else None
    client = genai.Client(
        vertexai=True, project=PROJECT, location=LOCATION, credentials=credentials
    )

    painted = 0
    for model in args.model or MODELS:
        for name in variants:
            pictures = [reference, traveller] if name == "swap" else [reference]
            started = time.monotonic()
            try:
                data, tokens = paint(client, model, VARIANTS[name], pictures)
            except Exception as error:  # noqa: BLE001 - report it and go on to the next model
                print(f"{model} {name}: failed: {type(error).__name__}: {str(error)[:300]}")
                break
            path = args.out / f"{name}-{model}.png"
            path.write_bytes(data)
            painted += 1
            seconds = time.monotonic() - started
            print(f"{model} {name}: {path}, {len(data):,} bytes, {seconds:.0f}s, tokens {tokens}")
    return 0 if painted else 1


if __name__ == "__main__":
    sys.exit(main())
