import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal.jsx'
import { skills } from '../data.js'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section id="about" ref={ref} className="about" aria-labelledby="about-title">
      <motion.span className="about-numeral" aria-hidden="true" style={{ y: drift }}>
        7
      </motion.span>

      <div className="wrap about-grid">
        <header className="about-head">
          <p className="label">About</p>
          <Reveal as="h2" id="about-title" className="about-title">
            Seven years getting websites found. Now I build them.
          </Reveal>
        </header>

        <div className="about-body">
          <Reveal as="p" className="about-lede">
            I’m a Computing graduate from the University of Suffolk, where I specialised in Web & Mobile Development.
          </Reveal>
          <Reveal as="p" delay={0.05}>
            Before university I spent seven years in digital marketing, with a particular interest in SEO and PPC. That
            background still shapes how I build: pages that load quickly, read clearly, are structured for search and are
            measured once they’re live.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            My projects range from a full personal finance application to PHP and MySQL systems with account roles, and
            small JavaScript tools for everyday SEO checks.
          </Reveal>
        </div>

        <div className="skills">
          <Reveal className="skill-col">
            <h3 className="label">Marketing</h3>
            <ul>
              {skills.marketing.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="skill-col" delay={0.08}>
            <h3 className="label">Design & development</h3>
            <ul>
              {skills.build.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="skill-col" delay={0.16}>
            <h3 className="label">Education</h3>
            <ul>
              <li>Computing</li>
              <li className="muted">University of Suffolk</li>
              <li className="muted">Web & Mobile Development</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
