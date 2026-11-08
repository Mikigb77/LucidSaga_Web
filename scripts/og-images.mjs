// Draws the link-preview cards, public/og/{en,es,ca}.jpg (1200 x 630), from the site's own words,
// fonts and gate art, so a shared link looks like the site. Run it again after changing the hero's
// words: `node --no-warnings scripts/og-images.mjs`. It needs Playwright with Chromium (`npm i -g playwright`).
import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = (path) => pathToFileURL(join(root, path)).href;
const types = { woff2: "font/woff2", webp: "image/webp", png: "image/png" };
// The card is set as page content, which may not load file URLs, so its fonts and pictures go inline.
const inline = async (path) =>
  `data:${types[path.split(".").pop()]};base64,${(await readFile(join(root, path))).toString("base64")}`;
const assets = Object.fromEntries(
  await Promise.all(
    [
      "src/fonts/Inter-Medium.woff2",
      "src/fonts/Literata-Regular.woff2",
      "src/fonts/LiterataDisplay-Medium.woff2",
      "src/assets/gate.webp",
      "src/app/icon.png",
    ].map(async (path) => [path, await inline(path)]),
  ),
);
const { chromium } = createRequire(import.meta.url)("playwright");

const locales = ["en", "es", "ca"];

function card(t, lang) {
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url(${assets["src/fonts/Inter-Medium.woff2"]}); font-weight: 500; }
@font-face { font-family: Literata; src: url(${assets["src/fonts/Literata-Regular.woff2"]}); }
@font-face { font-family: "Literata Display"; src: url(${assets["src/fonts/LiterataDisplay-Medium.woff2"]}); font-weight: 500; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: #0b0d12;
  color: #ede8df; font-family: Inter, sans-serif; }
.glow { position: absolute; inset: 0;
  background: radial-gradient(55% 75% at 80% 50%, rgba(227, 182, 107, 0.16), transparent 70%); }
.art { position: absolute; top: 50%; right: -150px; width: 860px; height: 860px; transform: translateY(-50%);
  -webkit-mask-image: radial-gradient(closest-side, #000 55%, transparent 100%); }
.art img { width: 100%; height: 100%; object-fit: cover; }
.fade { position: absolute; inset: 0;
  background: linear-gradient(90deg, #0b0d12 0%, rgba(11, 13, 18, 0.9) 34%, rgba(11, 13, 18, 0) 64%); }
.content { position: absolute; left: 72px; top: 64px; bottom: 64px; width: 660px;
  display: flex; flex-direction: column; }
.brand { display: flex; align-items: center; gap: 14px; font-family: "Literata Display", serif;
  font-size: 30px; font-weight: 500; letter-spacing: -0.01em; }
.brand img { width: 48px; height: 48px; border-radius: 12px; }
h1 { margin-top: auto; font-family: "Literata Display", serif; font-weight: 500; font-size: 66px;
  line-height: 1.04; letter-spacing: -0.02em; }
h1 span { display: block; background: linear-gradient(100deg, #f6dfa8 0%, #e3b66b 45%, #c98f3e 100%);
  -webkit-background-clip: text; color: transparent; }
p { margin-top: 22px; color: #b4b8c3; font-family: Literata, serif; font-size: 25px; line-height: 1.4; }
.soon { margin-top: auto; align-self: flex-start; display: inline-flex; align-items: center; gap: 12px;
  padding: 11px 20px 11px 16px; border-radius: 999px; border: 1px solid rgba(227, 182, 107, 0.4);
  background: rgba(227, 182, 107, 0.08); color: #f6dfa8; font-size: 21px; font-weight: 500; }
.soon svg { width: 20px; height: 20px; color: #e3b66b; }
</style></head><body>
<div class="glow"></div>
<div class="art"><img src="${assets["src/assets/gate.webp"]}" alt=""></div>
<div class="fade"></div>
<div class="content">
  <div class="brand"><img src="${assets["src/app/icon.png"]}" alt="">Lucid Saga</div>
  <h1>${t.hero.titleA}<span>${t.hero.titleB}</span></h1>
  <p>${t.hero.lead}</p>
  <div class="soon"><svg viewBox="0 0 32 32"><path d="M9.5 5.6c0-1.6 1.8-2.6 3.1-1.7l14 9.4c1.2.8 1.2 2.6 0 3.4l-14 9.4c-1.3.9-3.1-.1-3.1-1.7z" fill="currentColor"/></svg>${t.badge.label}</div>
</div>
</body></html>`;
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await mkdir(join(root, "public/og"), { recursive: true });
  for (const lang of locales) {
    const t = (await import(file(`src/i18n/dictionaries/${lang}.ts`)))[lang];
    await page.setContent(card(t, lang), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const out = join(root, `public/og/${lang}.jpg`);
    await page.screenshot({ path: out, type: "jpeg", quality: 86 });
    console.log(`wrote ${out}`);
  }
} finally {
  await browser.close();
}
