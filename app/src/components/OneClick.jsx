import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { oneclick as oc } from '../data.js'

export default function OneClick() {
  const stage = useRef(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'end start'] })
  const frameY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <article className="feature oneclick" aria-labelledby="oc-title">
      <div className="wrap">
        <header className="feature-head">
          <Reveal as="p" className="index">
            01
          </Reveal>
          <div>
            <Reveal as="p" className="label">
              {oc.kind}
            </Reveal>
            <Reveal as="h3" id="oc-title" className="feature-title" delay={0.05}>
              {oc.title}
            </Reveal>
          </div>
        </header>
      </div>

      <div className="stage oc-stage" ref={stage}>
        <div className="wrap oc-grid">
          <motion.a
            className="browser oc-browser"
            href={oc.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            style={{ y: frameY }}
          >
            <div className="browser-bar">
              <span className="browser-url">oneclicktools.co.uk</span>
            </div>
            <img
              src="/img/oc-home.webp"
              width="1160"
              height="960"
              alt="OneClickTools homepage showing the calculators"
              loading="lazy"
              decoding="async"
            />
          </motion.a>

          <Reveal className="oc-copy">
            <p className="oc-summary">{oc.summary}</p>
            <p>{oc.detail}</p>
            <a className="button" href={oc.url} target="_blank" rel="noreferrer">
              Visit oneclicktools.co.uk <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
