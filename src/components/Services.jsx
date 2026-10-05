import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../content.js'

// Bal oldalon ragadós képkeret, jobb oldalon a szövegek. Amelyik szöveg középre ér,
// annak a képe "lefüggönyöződik" a keretben.
export default function Services() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    const triggers = itemRefs.current.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(i),
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  const current = services.items[active]

  return (
    <section id="szolgaltatasok" className="services">
      <div className="blob" style={{ background: `var(${current.color})`, top: '10%', left: '-15%', transition: 'background-color .8s' }} />
      <div className="blob" style={{ background: 'var(--c-violet)', bottom: '-10%', right: '-20%' }} />
      <div className="wrap">
        <h2 className="display h2 services__head">{services.heading}</h2>
        <div className="services__grid">
          <div className="services__media glass" aria-hidden="true">
            <div className="services__frame">
              {services.items.map((s, i) => (
                <img
                  key={i}
                  src={s.image}
                  alt=""
                  className={`services__img ${i === active ? 'is-active' : i < active ? 'is-past' : ''}`}
                  style={{ zIndex: i }}
                />
              ))}
            </div>
            <div className="services__badge glass" style={{ '--g': `var(${current.color})` }}>
              <i />{current.title}
            </div>
          </div>

          <div>
            {services.items.map((s, i) => (
              <article
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`service ${i === active ? 'is-active' : ''}`}
                style={{ '--g': `var(${s.color})` }}
              >
                <img className="service__mobileimg" src={s.image} alt={s.alt} loading="lazy" />
                <h3 className="display service__title">{s.title}</h3>
                <span className="service__line" />
                <p className="service__text">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
