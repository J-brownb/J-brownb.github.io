import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import Reveal, { ease } from './Reveal.jsx'
import { moneywise as mw } from '../data.js'

export default function Moneywise() {
  const [view, setView] = useState(mw.shots[0].id)
  const stage = useRef(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'end start'] })
  const frameY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const devicesY = useTransform(scrollYProgress, [0, 1], [140, -140])
  const shot = mw.shots.find((s) => s.id === view)

  return (
    <article className="feature" aria-labelledby="mw-title">
      <div className="wrap">
        <header className="feature-head">
          <Reveal as="p" className="index">
            02
          </Reveal>
          <div>
            <Reveal as="p" className="label">
              {mw.kind}
            </Reveal>
            <Reveal as="h3" id="mw-title" className="feature-title" delay={0.05}>
              {mw.title}
            </Reveal>
          </div>
          <Reveal as="p" className="feature-summary" delay={0.1}>
            {mw.summary}
          </Reveal>
        </header>
      </div>

      <div className="stage" ref={stage}>
        <div className="wrap">
          <motion.div className="browser" style={{ y: frameY }}>
            <div className="browser-bar">
              <span className="browser-url">moneywise</span>
              <div className="views" role="group" aria-label="Moneywise screens">
                {mw.shots.map((s) => (
                  <button
                    key={s.id}
                    aria-pressed={view === s.id}
                    className="view"
                    onClick={() => setView(s.id)}
                  >
                    {s.label}
                    {view === s.id && <motion.span className="view-line" layoutId="mw-view" transition={{ duration: 0.45, ease }} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="browser-screen">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={shot.id}
                  src={shot.src}
                  width={shot.w}
                  height={shot.h}
                  alt={`Moneywise ${shot.label.toLowerCase()} screenshot`}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.img
            className="devices"
            src="/img/mw-devices.webp"
            width="1000"
            height="667"
            alt="Moneywise dashboard on a phone and a laptop"
            loading="lazy"
            decoding="async"
            style={{ y: devicesY }}
          />
        </div>
      </div>

      <div className="wrap">
        <div className="brief">
          <Reveal className="brief-item">
            <h4 className="label">The problem</h4>
            <p>{mw.problem}</p>
          </Reveal>
          <Reveal className="brief-item" delay={0.08}>
            <h4 className="label">The approach</h4>
            <p>{mw.approach}</p>
          </Reveal>
          <Reveal className="brief-item" delay={0.16}>
            <h4 className="label">Built with</h4>
            <p className="stack">{mw.stack.join(' / ')}</p>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
