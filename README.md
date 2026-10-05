# Bőrfestés Debrecen – scrollytelling demó

React + Vite + GSAP (ScrollTrigger) + Lenis.

## Indítás

```bash
npm install
npm run dev        # fejlesztői szerver: http://localhost:5173
npm run build      # éles build a dist/ mappába
npm run preview    # a build megtekintése
```

## Hol mit cserélj

| Mit | Hol |
|---|---|
| Minden szöveg, telefonszám, cím, kép | `src/content.js` |
| Színek, üveghatás, világos/sötét mód | `src/styles/theme.css` |
| A videós rész fejezeteinek időzítése | `src/content.js` → `story.chapters` (`from` / `to`, 0–1 között) |
| Képek | `src/assets/img/`, majd import a `content.js`-ben |

## Videó cseréje

A görgetett videó képkockákból áll (`public/frames/`), mert csak így lesz akadásmentes
oda-vissza görgetéskor. Új videónál:

```bash
rm public/frames/*
# a crop a fekete csíkokat vágja le; ha nincs csík, hagyd ki a crop=… részt
ffmpeg -i video.mp4 -vf "crop=1920:816:0:132,fps=12,scale=1440:-2" \
  -c:v libwebp -quality 62 public/frames/f_%04d.webp
ls public/frames | wc -l   # ezt a számot írd be a src/frames.js FRAME_COUNT értékébe
```

A fekete csíkok mérete: `ffmpeg -i video.mp4 -t 10 -vf cropdetect -f null - 2>&1 | grep crop=`

## Demó korlátok

- A kapcsolati űrlap nem küld el semmit (`src/components/Contact.jsx`, `onSubmit`).
- A galéria képaláírásai helykitöltők.
- A videó és a fotók felhasználási jogát éles oldal előtt rendezni kell.
