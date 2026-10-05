import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { process } from '../content.js'

const colors = ['--c-hot', '--c-ion', '--c-volt', '--c-violet']

// Egymásra csúszó üvegkártyák: a lentebbi rácsúszik, az előző hátrébb lép.
export default function Process() {
  const listRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.step')
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1]
        if (!nextCard) return
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: { trigger: nextCard, start: 'top bottom', end: 'top 20%', scrub: true },
        })
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="menet" className="process">
      <div className="blob" style={{ background: 'var(--c-ion)', top: '20%', right: '-18%' }} />
      <div className="blob" style={{ background: 'var(--c-hot)', bottom: '0%', left: '-20%' }} />
      <div className="wrap">
        <h2 className="display h2 process__head">{process.heading}</h2>
        <ol ref={listRef} className="process__list">
          {process.steps.map((s, i) => (
            <li key={i} className="step glass" style={{ '--i': i, '--g': `var(${colors[i % colors.length]})` }}>
              <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="display step__title">{s.title}</h3>
                <p className="step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
