import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { links } from '../data.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="label">Contact</p>
        <Reveal as="h2" id="contact-title" className="contact-title">
          Working on something? <span>Say hello.</span>
        </Reveal>
        <Reveal as="p" className="contact-text" delay={0.05}>
          Whether it’s a role, a project or just a question, I’d love to hear from you. Email is quickest, or find me on
          LinkedIn.
        </Reveal>

        <Reveal className="email-row" delay={0.1}>
          <a className="email" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <button className="ghost" onClick={copy}>
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email address copied' : ''}
          </span>
        </Reveal>

        <ul className="socials">
          <li>
            <a className="link" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a className="link" href={links.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <footer className="footer wrap">
        <p>© {new Date().getFullYear()} Jonny Hodgson</p>
        <p className="muted">Built with React, Vite and Motion.</p>
        <a className="link" href="#hero">
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </footer>
    </section>
  )
}
