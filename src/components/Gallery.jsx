import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { gallery } from '../content.js'

// Asztali nézetben a szekció kitűződik, és a képsor vízszintesen gördül.
// Mobilon simán oldalra húzható.
export default function Gallery() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px)', () => {
      const track = trackRef.current
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => { barRef.current.style.transform = `scaleX(${self.progress})` },
        },
      })
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray('.shot img', track).forEach((img) => {
          gsap.fromTo(img, { xPercent: -7 }, {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          })
        })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="munkaink" ref={sectionRef} className="gallery">
      <div className="gallery__pin">
        <div ref={trackRef} className="gallery__track">
          <div className="gallery__intro">
            <h2 className="display h2">{gallery.heading}</h2>
            <p>Görgess tovább, és nézd végig.</p>
          </div>
          {gallery.items.map((g, i) => (
            <figure key={i} className="shot">
              <img src={g.image} alt={g.title} loading="lazy" />
              <figcaption className="glass">
                <b>{g.title}</b>
                <span>{g.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="gallery__progress" aria-hidden="true"><i ref={barRef} /></div>
    </section>
  )
}
