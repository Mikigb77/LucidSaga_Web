"""Turns the source pictures into the site's WebP files in src/assets. Run once when a source changes:

    python3 scripts/prepare_images.py SOURCES_DIR

SOURCES_DIR holds what the site draws on, none of it kept in this repo:

- covers/<premise-id>.jpg: the starter worlds' covers, as the backend drew them in the house style
  (gs://playable-anime-pictures/premises/<premise-id>/, 896 x 1200). Their bottom third is a calm,
  dark band for the app's title, where the model sometimes writes words of its own, so only the
  top 68 % is kept.
- gate.png: the forest gate painting behind the app icon (1024 x 1024).
- popup-world.png: a book that opens into a world, from the same round of paintings.
- scenes/<name>.jpg: scene pictures in the house style (1376 x 768).
- icon.png: the app's launcher icon at 512 px (PlayableAnime app/web/icons/Icon-512.png).

Needs Pillow with WebP support.
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
COVER_KEEP = 0.68


def save_webp(image: Image.Image, path: Path, width: int, quality: int = 80) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if image.width > width:
        height = round(image.height * width / image.width)
        image = image.resize((width, height), Image.Resampling.LANCZOS)
    image.convert("RGB").save(path, "WEBP", quality=quality, method=6)
    print(f"{path.relative_to(ROOT)}  {image.width}x{image.height}  {path.stat().st_size // 1024} KB")


def main(sources: Path) -> None:
    for cover in sorted((sources / "covers").glob("*.jpg")):
        image = Image.open(cover)
        top = image.crop((0, 0, image.width, round(image.height * COVER_KEEP)))
        save_webp(top, ASSETS / "worlds" / f"{cover.stem}.webp", 560, quality=78)
    gate = Image.open(sources / "gate.png")
    save_webp(gate, ASSETS / "gate.webp", 1400, quality=80)
    save_webp(Image.open(sources / "popup-world.png"), ASSETS / "popup-world.webp", 900)
    for scene in sorted((sources / "scenes").glob("*.jpg")):
        save_webp(Image.open(scene), ASSETS / "scenes" / f"{scene.stem}.webp", 1200)
    icon = Image.open(sources / "icon.png").convert("RGBA")
    app = ROOT / "src" / "app"
    icon.resize((192, 192), Image.Resampling.LANCZOS).save(app / "icon.png")
    icon.resize((180, 180), Image.Resampling.LANCZOS).convert("RGB").save(app / "apple-icon.png")
    icon.save(app / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    icon.resize((96, 96), Image.Resampling.LANCZOS).save(ASSETS / "icon-96.png")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
