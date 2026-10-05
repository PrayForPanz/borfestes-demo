import { useState } from 'react'
import { brand, cta } from '../content.js'
import { Phone, Mail, Pin, Clock } from './Icons.jsx'

export default function Contact() {
  const [note, setNote] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    // DEMÓ: itt még nincs küldés. Élesben pl. Formspree vagy saját végpont kell ide.
    setNote('Ez egy demó: az üzenet nem lett elküldve. Hívj minket telefonon!')
  }

  const rows = [
    { icon: <Phone />, label: 'Telefon', value: brand.phone, href: brand.phoneHref, g: '--c-hot' },
    { icon: <Mail />, label: 'E-mail', value: brand.email, href: `mailto:${brand.email}`, g: '--c-ion' },
    { icon: <Pin />, label: 'Cím', value: brand.address, href: brand.mapsHref, g: '--c-volt' },
    { icon: <Clock />, label: 'Nyitvatartás', value: brand.hours, g: '--c-violet' },
  ]

  return (
    <section id="kapcsolat" className="contact">
      <div className="contact__bg" aria-hidden="true"><img src={cta.image} alt="" loading="lazy" /></div>
      <div className="blob" style={{ background: 'var(--c-hot)', top: '30%', left: '-15%' }} />
      <div className="blob" style={{ background: 'var(--c-ion)', bottom: '-10%', right: '-15%' }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="display contact__title">{cta.title}</h2>

        <div className="contact__grid">
          <div className="contact__card glass">
            <ul className="contact__list">
              {rows.map((r) => (
                <li key={r.label} style={{ '--g': `var(${r.g})` }}>
                  <span className="ico">{r.icon}</span>
                  <div>
                    <small>{r.label}</small>
                    {r.href ? <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{r.value}</a> : <strong>{r.value}</strong>}
                  </div>
                </li>
              ))}
            </ul>
            <a className="btn btn--hot" href={brand.phoneHref}><Phone /> {cta.button}</a>
          </div>

          <form className="contact__card glass form" onSubmit={onSubmit}>
            <label>Név<input name="name" autoComplete="name" required /></label>
            <label>Telefonszám<input name="phone" type="tel" autoComplete="tel" required /></label>
            <label>Mit szeretnél?<textarea name="message" placeholder="pl. kiült vezetőülés, kopott kormány" /></label>
            <button className="btn btn--hot" type="submit">Visszahívást kérek</button>
            <p className="form__note" role="status">{note}</p>
          </form>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: 'clamp(60px, 8vw, 120px)', position: 'relative', zIndex: 1 }}>
        <div className="wrap">
          <span>© {new Date().getFullYear()} {brand.name} {brand.city} · {brand.owner}</span>
          <a href={brand.facebook} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </footer>
    </section>
  )
}
