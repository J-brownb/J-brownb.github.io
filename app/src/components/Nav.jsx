import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ease } from './Reveal.jsx'

const items = [
  ['work', 'Work'],
  ['tools', 'Tools'],
  ['about', 'About'],
  ['contact', 'Contact'],
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const button = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner wrap">
        <a className="brand" href="#hero" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            JH
          </span>
          <span className="brand-name">Jonny Hodgson</span>
        </a>

        <nav aria-label="Main">
          <ul className="nav-links">
            {items.map(([id, label]) => (
              <li key={id}>
                <a className="nav-link" href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                  {label}
                  {active === id && <motion.span className="nav-dot" layoutId="nav-dot" transition={{ duration: 0.5, ease }} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            className="menu"
            aria-label="Mobile"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <ul>
              {items.map(([id, label], i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.06 }}
                >
                  <a href={`#${id}`} onClick={() => setOpen(false)}>
                    <span className="menu-index">0{i + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
