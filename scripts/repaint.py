"""Repaints a picture at 4K with Gemini on Vertex AI, keeping its design. The hero's gate was made
with it (scripts/prepare_images.py, gate.png), in two steps after scripts/upscale.py:

    python3 scripts/repaint.py gate-x4.png out --variant faithful --model gemini-3-pro-image
    python3 scripts/repaint.py out/faithful-gemini-3-pro-image.png out --variant traveller \\
        --model gemini-3-pro-image

- gate-x4.png is the Real-ESRGAN upscale of the app icon's painting (scripts/upscale.py). The
  faithful step paints it again at 4096 px with nothing moved, which cleans up the upscale's
  smudges; the traveller step then draws the cloaked traveller with more care (a gold rim of
  light, robe folds, the satchel, boots) and leaves the rest of the scene alone. The last
  picture is gate.png.
- The reference goes to the model as a 2048 px JPEG. Gemini paints a new picture each time, so a
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


def paint(client: genai.Client, model: str, prompt: str, reference: bytes) -> tuple[bytes, str]:
    response = client.models.generate_content(
        model=model,
        contents=[types.Part.from_bytes(data=reference, mime_type="image/jpeg"), prompt],
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
    parser.add_argument("--model", action="append", help="defaults to every model in MODELS")
    parser.add_argument("--gcloud-config", help="sign in with this gcloud configuration's token")
    args = parser.parse_args()

    reference = as_reference(args.reference)
    args.out.mkdir(parents=True, exist_ok=True)
    credentials = gcloud_credentials(args.gcloud_config) if args.gcloud_config else None
    client = genai.Client(
        vertexai=True, project=PROJECT, location=LOCATION, credentials=credentials
    )

    painted = 0
    for model in args.model or MODELS:
        for name in args.variant or ["faithful"]:
            started = time.monotonic()
            try:
                data, tokens = paint(client, model, VARIANTS[name], reference)
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
