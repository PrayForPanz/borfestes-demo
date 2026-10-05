import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import Nav from './components/Nav.jsx'
import ScrollyHero from './components/ScrollyHero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Gallery from './components/Gallery.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07060b' : '#f2f0f8')
  }, [theme])

  // Sima görgetés (Lenis) – kikapcsolva, ha a látogató kevesebb mozgást kér
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.085, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <ScrollyHero />
        <Marquee />
        <Services />
        <Process />
        <Gallery />
        <Faq />
        <Contact />
      </main>
    </>
  )
}
