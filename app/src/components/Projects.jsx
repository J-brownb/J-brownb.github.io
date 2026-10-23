import { useState } from 'react'
import { motion } from 'motion/react'
import Reveal, { ease } from './Reveal.jsx'
import { projects } from '../data.js'

const slots = [
  { x: 0, y: '0%', rotate: 0, scale: 1, zIndex: 3 },
  { x: 18, y: '-6%', rotate: 4, scale: 0.92, zIndex: 2 },
  { x: 32, y: '-11%', rotate: 8, scale: 0.84, zIndex: 1 },
]

const place = (slot, flip) => ({
  ...slot,
  x: `${flip ? -slot.x : slot.x}%`,
  rotate: flip ? -slot.rotate : slot.rotate,
})

function Fan({ project, flip }) {
  const [front, setFront] = useState(0)
  const order = project.shots.map((_, i) => (i - front + project.shots.length) % project.shots.length)

  return (
    <div className="fan-wrap">
      <div className="fan">
        {project.shots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            className="fan-shot"
            animate={place(slots[order[i]], flip)}
            transition={{ duration: 0.8, ease }}
            onClick={() => setFront(i)}
          >
            <img
              src={shot.src}
              width={shot.w}
              height={shot.h}
              alt={`${project.title} ${shot.label.toLowerCase()} screenshot`}
              loading="lazy"
              decoding="async"
            />
          </motion.figure>
        ))}
      </div>
      <div className="fan-controls" role="group" aria-label={`${project.title} screens`}>
        {project.shots.map((shot, i) => (
          <button key={shot.label} className="view" aria-pressed={front === i} onClick={() => setFront(i)}>
            {shot.label}
            {front === i && <motion.span className="view-line" layoutId={`fan-${project.id}`} transition={{ duration: 0.45, ease }} />}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <div className="projects wrap">
      {projects.map((p, n) => (
        <article
          key={p.id}
          className={`project ${n % 2 ? 'flip' : ''}`}
          style={{ '--tint': p.tint }}
          aria-labelledby={`${p.id}-title`}
        >
          <Reveal className="project-visual">
            <Fan project={p} flip={n % 2 === 1} />
          </Reveal>

          <div className="project-copy">
            <Reveal as="p" className="index">
              0{n + 3}
            </Reveal>
            <Reveal as="p" className="label">
              {p.kind}
            </Reveal>
            <Reveal as="h3" id={`${p.id}-title`} className="project-title" delay={0.05}>
              {p.title}
            </Reveal>
            <Reveal as="p" className="project-summary" delay={0.1}>
              {p.summary}
            </Reveal>

            <Reveal as="ul" className="ticks" delay={0.12}>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </Reveal>

            <div className="notes">
              {p.notes.map(([title, text], i) => (
                <Reveal key={title} className="note" delay={0.14 + i * 0.06}>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="project-foot" delay={0.2}>
              <p className="stack">{p.stack.join(' / ')}</p>
            </Reveal>
          </div>
        </article>
      ))}
    </div>
  )
}
