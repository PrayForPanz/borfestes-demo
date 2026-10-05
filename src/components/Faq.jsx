import { useState } from 'react'
import { faq } from '../content.js'
import { Plus } from './Icons.jsx'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="blob" style={{ background: 'var(--c-volt)', top: '10%', left: '-22%', opacity: 0.3 }} />
      <div className="blob" style={{ background: 'var(--c-violet)', bottom: '-20%', right: '-10%' }} />
      <div className="wrap faq__grid">
        <h2 id="faq-title" className="display h2">{faq.heading}</h2>
        <div className="faq__list">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`qa glass ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="qa__q"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`qa-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="qa__icon"><Plus /></span>
                </button>
                <div id={`qa-${i}`} className="qa__a" role="region">
                  <div><p>{item.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
