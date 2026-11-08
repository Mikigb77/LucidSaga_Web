#!/usr/bin/env bash
# Cuts the app's fonts down to the Latin letters the site's three languages need, as WOFF2, into
# src/fonts. Run once when a font changes. Needs fonttools with brotli: pip install fonttools brotli
#
# Usage: scripts/subset-fonts.sh PATH/TO/PlayableAnime/app/assets/fonts

set -euo pipefail

src="${1:?the folder with the app's .ttf fonts}"
out="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/src/fonts"
# Basic Latin and Latin-1 (every letter of English, Spanish and Catalan, ¿ ¡ ç ñ ·), Catalan's
# Ŀ ŀ, the typographic quotes, dashes and ellipsis, and the euro sign.
unicodes='U+0000-00FF,U+0131,U+0152-0153,U+013F-0140,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD'
for font in Inter-Regular Inter-Medium Inter-SemiBold Literata-Regular Literata-Italic \
  Literata-SemiBold LiterataDisplay-Medium; do
  pyftsubset "$src/$font.ttf" --output-file="$out/$font.woff2" --flavor=woff2 \
    --layout-features='kern,liga,calt,ccmp,locl,mark,mkmk,onum,pnum,tnum,case' \
    --unicodes="$unicodes"
done
cp "$src/Inter-OFL.txt" "$src/Literata-OFL.txt" "$out/"
