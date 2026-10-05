// A videóból kibontott képkockák (public/frames/f_0001.webp …).
// Új videónál: futtasd a README-ben lévő ffmpeg parancsot, és írd át a FRAME_COUNT-ot.
export const FRAME_COUNT = 401
export const framePath = (i) => `/frames/f_${String(i + 1).padStart(4, '0')}.webp`
