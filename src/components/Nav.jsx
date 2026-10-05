import { brand, nav } from '../content.js'
import { Phone, Sun, Moon } from './Icons.jsx'

export default function Nav({ theme, onToggleTheme }) {
  return (
    <header className="nav glass">
      <a className="nav__logo" href="#top" aria-label={`${brand.name} ${brand.city} – az oldal teteje`}>
        <b>{brand.name}</b>
        <span>{brand.city}</span>
      </a>
      <nav className="nav__links" aria-label="Fő navigáció">
        {nav.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
      <button
        className="nav__icon"
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Váltás világos módra' : 'Váltás sötét módra'}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
      <a className="btn btn--hot" href={brand.phoneHref} aria-label={`Hívás: ${brand.phone}`}>
        <Phone />
        <span>{brand.phone}</span>
      </a>
    </header>
  )
}
