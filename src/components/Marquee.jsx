import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from './Icons.jsx'
import { services } from '../content.js'

// Futó szalag a szolgáltatások nevével; görgetés közben a sebességtől megdől.
export default function Marquee() {
  const rowRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const skew = gsap.quickTo(rowRef.current, 'skewX', { duration: 0.5, ease: 'power3' })
    const st = ScrollTrigger.create({
      onUpdate: (self) => skew(gsap.utils.clamp(-14, 14, self.getVelocity() / -260)),
    })
    return () => st.kill()
  }, [])

  const words = services.items.map((s) => s.title)
  const group = (hidden) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className={`marquee__word ${i % 2 ? 'marquee__word--out' : 'marquee__word--fill'}`}>{w}</span>
          <Star className="marquee__star" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" role="presentation">
      <div ref={rowRef} className="marquee__row">
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
