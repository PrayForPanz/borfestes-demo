// ─────────────────────────────────────────────────────────────
//  AZ OLDAL ÖSSZES SZÖVEGE ÉS KÉPE ITT VAN.
//  Szöveget, telefonszámot, képet csak ebben a fájlban kell cserélni.
//  Színek: src/styles/theme.css
// ─────────────────────────────────────────────────────────────
import steeringClean from './assets/img/steering-clean.webp'
import studioPolish from './assets/img/studio-polish.webp'
import wheelBrush from './assets/img/wheel-brush.webp'
import polishHood from './assets/img/polish-hood.webp'
import amgFoam from './assets/img/amg-foam.webp'
import bmwFront from './assets/img/bmw-front.webp'
import gt3rs from './assets/img/gt3rs.webp'

export const brand = {
  name: 'Bőrfestés',
  city: 'Debrecen',
  phone: '+36 20 228 4498',
  phoneHref: 'tel:+36202284498',
  email: 'info@borfestesdebrecen.hu',
  address: 'Bartók Béla út 61., Momál udvar, 4031 Debrecen',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Bart%C3%B3k+B%C3%A9la+%C3%BAt+61+Debrecen',
  hours: 'Hétfő–péntek 9:00–17:00',
  facebook: 'https://www.facebook.com/borfestesdebrecen/',
  owner: 'Suba Attila EV.',
}

export const nav = [
  { label: 'Szolgáltatások', href: '#szolgaltatasok' },
  { label: 'Menet', href: '#menet' },
  { label: 'Munkáink', href: '#munkaink' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

// A videós rész fejezetei. from / to = a videó hányad részénél (0–1) látszik.
// glow = a fejezet fényének színe (theme.css változó neve).
export const story = {
  intro: {
    title: 'Bőrfestés',
    sub: 'Autóbelső-felújítás Debrecenben',
    hint: 'Görgess',
  },
  chapters: [
    {
      from: 0.12, to: 0.3, side: 'left', glow: '--c-hot',
      title: 'Gyári szín.\nGyári struktúra.',
      text: 'Gyári színnel és gyári technológiával festünk, így a felület színe és szerkezete azonos lesz az eredetivel.',
    },
    {
      from: 0.35, to: 0.51, side: 'right', glow: '--c-ion',
      title: 'A részletekben\ndől el.',
      text: 'Kormány, váltógomb, könyöklő, kapaszkodók. A legapróbb felületig mindent kezelünk.',
    },
    {
      from: 0.55, to: 0.71, side: 'left', glow: '--c-volt',
      title: 'Kopott? Kiült?\nKirepedezett?',
      text: 'Ezeknek a problémáknak a legjobb helyreállítási módja a festés.',
    },
    {
      from: 0.75, to: 0.89, side: 'right', glow: '--c-violet',
      title: 'Újra az\n„új autó” érzés.',
      text: 'Teljes belső tisztítás után a legnagyobb odafigyeléssel adjuk vissza az autódat.',
    },
  ],
  outro: {
    title: 'Foglalj időpontot',
    text: 'Bővebb infó és bejelentkezés telefonon vagy üzenetben.',
  },
}

export const services = {
  heading: 'Amit csinálunk',
  items: [
    {
      title: 'Bőr- és műanyagfestés',
      text: 'Kopott, kiült vagy kirepedezett bőr és műanyag felületek helyreállítása festéssel. Gyári színnel, gyári technológiával.',
      image: steeringClean,
      alt: 'Bőrkormány tisztítása kefével',
      color: '--c-hot',
    },
    {
      title: 'Bőrtisztítás',
      text: 'Az elkoszolódott, kifényesedett bőr speciális tisztítóanyagokkal újra matt és tiszta lesz. A gyakoriság a használattól függ.',
      image: wheelBrush,
      alt: 'Habos felület tisztítása ecsettel',
      color: '--c-ion',
    },
    {
      title: 'Teljes belső tisztítás',
      text: 'Az autó belsejét a legapróbb részletekig tisztítjuk és ápoljuk, hogy újra átéld az „új autó” érzését.',
      image: studioPolish,
      alt: 'Fényesre polírozott autó világos belsővel',
      color: '--c-volt',
    },
  ],
}

export const process = {
  heading: 'Így dolgozunk',
  steps: [
    { title: 'Bejelentkezel', text: 'Hívj fel, vagy írj üzenetet, és egyeztetünk egy időpontot.' },
    { title: 'Felmérjük', text: 'Megnézzük a felületeket, és megbeszéljük, mire van szükség.' },
    { title: 'Felújítjuk', text: 'Tisztítás, festés, impregnálás: gyári színnel és technológiával.' },
    { title: 'Átadjuk', text: 'Ellenőrizzük a végeredményt, és visszakapod az autód.' },
  ],
}

// DEMÓ: a képaláírásokat cseréld valós munkákra.
export const gallery = {
  heading: 'Munkáink',
  items: [
    { title: 'BMW M', tag: 'Átadás előtt', image: bmwFront },
    { title: 'Porsche 911 GT3 RS', tag: 'Átadás előtt', image: gt3rs },
    { title: 'Mercedes-AMG S-osztály', tag: 'Előmosás', image: amgFoam },
    { title: 'Polírozott felület', tag: 'Részlet', image: polishHood },
    { title: 'Kerék és dobbetét', tag: 'Részlet', image: wheelBrush },
  ],
}

export const faq = {
  heading: 'Gyakori kérdések',
  items: [
    { q: 'Ugyanolyan színű lesz, mint gyárilag?', a: 'Igen. Gyári színnel és gyári technológiákkal dolgozunk, így a felület szerkezete és színe azonos lesz az eredetivel.' },
    { q: 'Milyen gyakran kell tisztítani a bőrt?', a: 'A használattól és az igénybevételtől függ, a bőr színével kevésbé függ össze.' },
    { q: 'Hogyan jelentkezhetek be?', a: 'Telefonon a +36 20 228 4498 számon, e-mailben, vagy üzenetben a Facebook-oldalunkon.' },
  ],
}

export const cta = {
  title: 'Hozd el,\nadjuk vissza újként.',
  button: 'Hívj most',
  image: polishHood,
}
