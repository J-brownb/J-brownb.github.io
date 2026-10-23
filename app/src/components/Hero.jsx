import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { ease } from './Reveal.jsx'

const tag = 'Jonny Hodgson | Web & Mobile Developer, ex-SEO & PPC'

const shots = [
  { src: '/img/flc-home.webp', alt: 'Fictional Library Co catalogue page', url: 'library / catalogue', depth: 14, className: 'shot shot-back' },
  { src: '/img/tws-home.webp', alt: 'The Wellness Site homepage', url: 'wellness / home', depth: 26, className: 'shot shot-mid' },
  { src: '/img/mw-dashboard.webp', alt: 'Moneywise dashboard in dark mode', url: 'moneywise / dashboard', depth: 42, className: 'shot shot-front' },
]

function TitleTag() {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? tag.length : 0)

  useEffect(() => {
    if (reduce) {
      setCount(tag.length)
      return
    }
    let i = 0
    let timer
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= tag.length) clearInterval(timer)
      }, 34)
    }, 900)
    return () => {
      clearTimeout(start)
      clearInterval(timer)
    }
  }, [reduce])

  const done = count >= tag.length
  return (
    <div className="tag">
      <p className="sr-only">
        Title tag: {tag}. {tag.length} of 60 characters, an ideal length.
      </p>
      <p className="tag-code" aria-hidden="true">
        <span className="tag-angle">&lt;title&gt;</span>
        {tag.slice(0, count)}
        {!done && <span className="caret" />}
        <span className="tag-angle">&lt;/title&gt;</span>
      </p>
      <div className="tag-meter" aria-hidden="true">
        <span className="tag-bar">
          <span style={{ transform: `scaleX(${Math.min(count / 60, 1)})` }} />
        </span>
        <span className="tag-count">{count} / 60</span>
        <span className={`tag-status ${done ? 'is-on' : ''}`}>Ideal length</span>
      </div>
    </div>
  )
}

function Shot({ shot, x, y, index }) {
  const tx = useTransform(x, (v) => v * shot.depth)
  const ty = useTransform(y, (v) => v * shot.depth)
  return (
    <motion.figure className={shot.className} style={{ x: tx, y: ty }}>
      <motion.div
        className="shot-frame"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.35 + index * 0.12 }}
      >
        <div className="shot-bar" aria-hidden="true">{shot.url}</div>
        <img src={shot.src} alt={shot.alt} fetchPriority={index === 2 ? 'high' : 'auto'} />
      </motion.div>
    </motion.figure>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 60, damping: 18 })
  const y = useSpring(py, { stiffness: 60, damping: 18 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const line = (delay) => ({
    initial: { y: '105%' },
    animate: { y: 0 },
    transition: { duration: 1.1, ease, delay },
  })

  return (
    <section id="hero" ref={ref} className="hero" onPointerMove={onMove} aria-labelledby="hero-title">
      <div className="hero-grid wrap">
        <motion.div className="hero-copy" style={{ y: reduce ? 0 : lift, opacity: fade }}>
          <motion.p
            className="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Web & mobile developer
          </motion.p>

          <h1 id="hero-title" className="hero-title">
            <span className="line">
              <motion.span {...line(0.1)}>Jonny</motion.span>
            </span>
            <span className="line">
              <motion.span {...line(0.2)}>
                Hodgson<span className="dot">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero-lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
          >
            I build web applications with a marketer’s instincts. I’m a Computing graduate from the University of Suffolk who
            spent seven years in SEO and PPC before moving into development. I also build and run{' '}
            <a className="inline-link" href="https://oneclicktools.co.uk/" target="_blank" rel="noreferrer">
              OneClick Tools
            </a>
            , a set of free everyday calculators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            <TitleTag />
            <div className="hero-actions">
              <a className="button" href="#work">
                See the work <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a className="link" href="#contact">
                Get in touch
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          {shots.map((shot, i) => (
            <Shot key={shot.src} shot={shot} x={x} y={y} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
