import { useEffect, useId, useState } from 'react'
import { Check, Copy, RefreshCw, RotateCcw } from 'lucide-react'
import Reveal from './Reveal.jsx'

const titleStatus = (n) => {
  if (n === 0) return ['idle', 'Aim for 50–60 characters.']
  if (n < 50) return ['short', 'A little short. Consider adding more detail.']
  if (n <= 60) return ['good', 'Nice. This is the ideal length.']
  return ['long', 'Heads up: this may be cut off in results pages.']
}

const descStatus = (n) => {
  if (n === 0) return ['idle', 'Aim for 155–160 characters.']
  if (n < 100) return ['short', 'Short. There’s room for more detail.']
  if (n < 155) return ['ok', 'Good going. A little more detail would fill the space.']
  if (n <= 160) return ['good', 'Nice. This is the ideal length.']
  return ['long', 'Heads up: this may be cut off in results pages.']
}

const clip = (text, max) => (text.length > max ? `${text.slice(0, max).trimEnd()}…` : text)

function Meter({ id, value, max, status }) {
  const [state, message] = status(value)
  return (
    <div className={`meter is-${state}`}>
      <span className="meter-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.min(value / max, 1)})` }} />
      </span>
      <p id={id} className="meter-text">
        <span className="meter-count">
          {value} / {max}
        </span>
        {message}
      </p>
    </div>
  )
}

const blank = { title: '', desc: '', name: '', url: '' }

function Serp() {
  const uid = useId()
  const [form, setForm] = useState(blank)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const dirty = Object.values(form).some(Boolean)

  return (
    <div className="tool serp">
      <div className="tool-form">
        <label className="field">
          <span>Title tag</span>
          <input
            value={form.title}
            onChange={set('title')}
            placeholder="Handmade Oak Furniture in Suffolk | Example Co"
            aria-describedby={`${uid}-title`}
          />
        </label>
        <Meter id={`${uid}-title`} value={form.title.length} max={60} status={titleStatus} />

        <label className="field">
          <span>Meta description</span>
          <textarea
            rows="3"
            value={form.desc}
            onChange={set('desc')}
            placeholder="Describe the page in a sentence or two that makes someone want to click."
            aria-describedby={`${uid}-desc`}
          />
        </label>
        <Meter id={`${uid}-desc`} value={form.desc.length} max={160} status={descStatus} />

        <div className="field-row">
          <label className="field">
            <span>Business name</span>
            <input value={form.name} onChange={set('name')} placeholder="Example Co" />
          </label>
          <label className="field">
            <span>URL</span>
            <input value={form.url} onChange={set('url')} placeholder="www.example.co.uk" inputMode="url" />
          </label>
        </div>

        <button className="ghost" onClick={() => setForm(blank)} disabled={!dirty}>
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
      </div>

      <figure className="serp-preview">
        <figcaption className="label">Preview</figcaption>
        <div className="result">
          <div className="result-site">
            <span className="result-icon" aria-hidden="true">
              {(form.name || 'Y').charAt(0).toUpperCase()}
            </span>
            <span>
              <span className="result-name">{form.name || 'Your Site Name'}</span>
              <span className="result-url">{form.url || 'www.your-site.co.uk'}</span>
            </span>
          </div>
          <p className="result-title">{clip(form.title, 60) || 'Your Title Tag'}</p>
          <p className="result-desc">{clip(form.desc, 160) || 'Your meta description will appear here.'}</p>
        </div>
        <p className="tool-note">
          Lengths follow Moz’s character recommendations. Search engines can rewrite titles and descriptions, so what
          appears may differ.
        </p>
      </figure>
    </div>
  )
}

const sets = {
  letters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: '!@#$%^&*()-_=+[]{};:,.?/~',
}

function randomIndex(max) {
  const limit = Math.floor(0x100000000 / max) * max
  const buf = new Uint32Array(1)
  do crypto.getRandomValues(buf)
  while (buf[0] >= limit)
  return buf[0] % max
}

function makePassword(length, noNumbers, noSpecial) {
  const pools = [sets.letters]
  if (!noNumbers) pools.push(sets.numbers)
  if (!noSpecial) pools.push(sets.special)
  const all = pools.join('')
  const chars = pools.map((p) => p[randomIndex(p.length)])
  while (chars.length < length) chars.push(all[randomIndex(all.length)])
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

function Password() {
  const [length, setLength] = useState(20)
  const [noNumbers, setNoNumbers] = useState(false)
  const [noSpecial, setNoSpecial] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setPassword(makePassword(length, noNumbers, noSpecial))
    setCopied(false)
  }, [length, noNumbers, noSpecial])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="tool password">
      <output className="password-out" aria-label="Generated password">
        {password}
      </output>

      <div className="password-actions">
        <button className="button" onClick={() => setPassword(makePassword(length, noNumbers, noSpecial))}>
          <RefreshCw size={16} aria-hidden="true" /> Generate
        </button>
        <button className="ghost" onClick={copy}>
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <label className="field range">
        <span>
          Length <strong>{length}</strong>
        </span>
        <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} />
      </label>

      <div className="checks">
        <label className="check">
          <input type="checkbox" checked={noNumbers} onChange={(e) => setNoNumbers(e.target.checked)} />
          Exclude numbers
        </label>
        <label className="check">
          <input type="checkbox" checked={noSpecial} onChange={(e) => setNoSpecial(e.target.checked)} />
          Exclude special characters
        </label>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? 'Password copied to clipboard' : ''}
      </span>

      <p className="tool-note">
        The original used the API Ninjas Password Generator API. This version runs entirely in your browser with the Web
        Crypto API, so passwords are never sent anywhere.
      </p>
    </div>
  )
}

export default function Tools() {
  return (
    <section id="tools" className="tools" aria-label="Tools">
      <div className="wrap">
        <Reveal as="article" className="tool-block" aria-labelledby="serp-title">
          <div className="tool-head">
            <span className="index">05</span>
            <h3 id="serp-title">SERP Preview Tool</h3>
            <p>Check title tag and meta description lengths, then preview how a page could look in search results.</p>
          </div>
          <Serp />
        </Reveal>

        <Reveal as="article" className="tool-block" aria-labelledby="pass-title">
          <div className="tool-head">
            <span className="index">06</span>
            <h3 id="pass-title">Password Generator</h3>
            <p>Choose a length, exclude numbers or special characters, and copy the result to your clipboard.</p>
          </div>
          <Password />
        </Reveal>
      </div>
    </section>
  )
}
