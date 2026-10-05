import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FRAME_COUNT, framePath } from '../frames.js'
import { story } from '../content.js'

// Betöltési sorrend: először minden 24. kocka (gyors indulás), aztán sűrítés.
function loadOrder(n) {
  const seen = new Uint8Array(n)
  const out = []
  for (const step of [24, 12, 6, 3, 1]) {
    for (let i = 0; i < n; i += step) if (!seen[i]) { seen[i] = 1; out.push(i) }
  }
  return out
}

const pad = (n) => String(n).padStart(2, '0')

export default function ScrollyHero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const introRef = useRef(null)
  const outroRef = useRef(null)
  const fillRef = useRef(null)
  const countRef = useRef(null)
  const chapterRefs = useRef([])
  const glowRefs = useRef([])
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const frames = new Array(FRAME_COUNT)
    const state = { frame: 0, zoom: 1 }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let cancelled = false

    const nearest = (i) => {
      if (frames[i]) return frames[i]
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (frames[i - d]) return frames[i - d]
        if (frames[i + d]) return frames[i + d]
      }
      return null
    }
    const draw = () => {
      raf = 0
      const img = nearest(Math.round(state.frame))
      if (!img) return
      const { width: w, height: h } = canvas
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * state.zoom
      const dw = img.naturalWidth * s
      const dh = img.naturalHeight * s
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    }
    const request = () => { if (!raf) raf = requestAnimationFrame(draw) }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      ctx.imageSmoothingQuality = 'high'
      request()
    }
    resize()
    window.addEventListener('resize', resize)

    // Képkockák betöltése, egyszerre max. 6 kérés
    const order = loadOrder(FRAME_COUNT)
    const firstPass = Math.ceil(FRAME_COUNT / 24)
    let next = 0
    let inflight = 0
    let loaded = 0
    const pump = () => {
      while (inflight < 6 && next < order.length) {
        const i = order[next++]
        inflight++
        const img = new Image()
        img.decoding = 'async'
        img.onload = img.onerror = () => {
          inflight--
          if (cancelled) return
          if (img.naturalWidth) frames[i] = img
          loaded++
          if (loaded <= firstPass) setLoadPct(Math.round((loaded / firstPass) * 100))
          if (loaded === firstPass) setReady(true)
          if (Math.abs(i - state.frame) < 40) request()
          pump()
        }
        img.src = framePath(i)
      }
    }
    pump()

    const g = gsap.context(() => {
      const chars = introRef.current.querySelectorAll('.ch')
      const total = story.chapters.length

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: reduce ? true : 0.7,
          onUpdate: (self) => {
            const p = self.progress
            fillRef.current.style.transform = `scaleX(${p})`
            const idx = story.chapters.findIndex((c) => p >= c.from - 0.02 && p <= c.to)
            countRef.current.textContent = idx >= 0 ? `${pad(idx + 1)} / ${pad(total)}` : p > 0.9 ? 'Kész' : `00 / ${pad(total)}`
          },
        },
      })

      // Videó: képkockák + enyhe ráközelítés
      tl.to(state, { frame: FRAME_COUNT - 1, zoom: 1.08, duration: 1, onUpdate: request }, 0)

      // Nyitócím szétrobban
      tl.to(chars, { yPercent: -150, opacity: 0, stagger: { each: 0.004, from: 'center' }, duration: 0.05, ease: 'power2.in' }, 0.012)
      tl.to(introRef.current.querySelectorAll('.story__sub, .story__hint'), { opacity: 0, y: -40, duration: 0.03 }, 0.006)

      // Fejezetek
      const blur = reduce ? 'blur(0px)' : 'blur(14px)'
      story.chapters.forEach((c, i) => {
        const el = chapterRefs.current[i]
        const glow = glowRefs.current[i]
        tl.fromTo(el, { autoAlpha: 0, y: 90, filter: blur }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.035, ease: 'power2.out' }, c.from)
          .to(el, { autoAlpha: 0, y: -90, filter: blur, duration: 0.035, ease: 'power2.in' }, c.to - 0.035)
        tl.fromTo(glow, { opacity: 0 }, { opacity: 0.6, duration: 0.035 }, c.from)
          .to(glow, { opacity: 0, duration: 0.035 }, c.to - 0.035)
      })

      // Zárókép
      tl.fromTo(outroRef.current, { autoAlpha: 0, scale: 0.88 }, { autoAlpha: 1, scale: 1, duration: 0.045, ease: 'power2.out' }, 0.925)
    }, sectionRef)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      g.revert()
    }
  }, [])

  // Egyetlen belépő animáció: a cím betűi felúsznak, amint megvan az első kép
  useEffect(() => {
    if (!ready || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const inner = introRef.current.querySelectorAll('.ch-in')
    gsap.fromTo(inner, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.045, ease: 'expo.out' })
    gsap.fromTo(introRef.current.querySelectorAll('.story__sub, .story__hint'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' })
  }, [ready])

  const { intro, chapters, outro } = story

  return (
    <section id="top" ref={sectionRef} className="story" aria-label="Bemutatkozó videó">
      <div className="story__stage">
        <canvas ref={canvasRef} className="story__canvas" aria-hidden="true" />
        <div className="story__shade" />
        {chapters.map((c, i) => (
          <div
            key={'g' + i}
            ref={(el) => (glowRefs.current[i] = el)}
            className={`story__glow story__glow--${c.side}`}
            style={{ '--g': `var(${c.glow})` }}
          />
        ))}

        <div ref={introRef} className="story__intro">
          <h1 className="display story__title" aria-label={intro.title}>
            {[...intro.title].map((ch, i) => (
              <span key={i} className="ch" aria-hidden="true" style={{ overflow: 'hidden', paddingBottom: '.06em' }}>
                <span className="ch-in" style={{ display: 'inline-block' }}>{ch}</span>
              </span>
            ))}
          </h1>
          <p className="story__sub glass">{intro.sub}</p>
          <div className="story__hint"><span>{intro.hint}</span><i /></div>
        </div>

        {chapters.map((c, i) => (
          <div key={i} className={`chapter-slot chapter-slot--${c.side}`}>
            <article
              ref={(el) => (chapterRefs.current[i] = el)}
              className="chapter glass"
              style={{ '--g': `var(${c.glow})` }}
            >
              <p className="chapter__num">{pad(i + 1)} / {pad(chapters.length)}</p>
              <h2 className="display chapter__title">{c.title}</h2>
              <p className="chapter__text">{c.text}</p>
              <span className="chapter__bar" />
            </article>
          </div>
        ))}

        <div ref={outroRef} className="story__outro">
          <h2 className="display">{outro.title}</h2>
          <p>{outro.text}</p>
          <a className="btn btn--hot" href="#kapcsolat">Időpontot kérek</a>
        </div>

        <div className="story__rail glass" aria-hidden="true">
          <span ref={countRef}>00 / {pad(chapters.length)}</span>
          <div className="story__track"><div ref={fillRef} className="story__fill" /></div>
        </div>

        <div className={`loader glass ${ready ? 'is-done' : ''}`} role="status" aria-live="polite">
          <div>Videó betöltése… {loadPct}%</div>
          <div className="loader__bar"><i style={{ width: `${loadPct}%` }} /></div>
        </div>
      </div>
    </section>
  )
}
