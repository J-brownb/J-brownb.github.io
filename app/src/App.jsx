import { MotionConfig } from 'motion/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import OneClick from './components/OneClick.jsx'
import Moneywise from './components/Moneywise.jsx'
import Projects from './components/Projects.jsx'
import Tools from './components/Tools.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#work">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <section id="work" className="work" aria-labelledby="work-title">
          <header className="section-head wrap">
            <p className="label">Selected work</p>
            <h2 id="work-title" className="section-title">
              Things I’ve designed and built.
            </h2>
          </header>
          <OneClick />
          <Moneywise />
          <Projects />
        </section>
        <Tools />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
