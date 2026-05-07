import { useState, useEffect, useRef } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbws6yp9c3g-6p-UhWqxrqJGDeY7SEn1CFYFehMR2MIvgtQJxom0OS5cPMOgc_eCdY-P/exec'

// ── Multi-select guest picker ────────────────────────────────
interface MultiSelectGuestsProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

function MultiSelectGuests({ options, selected, onChange }: MultiSelectGuestsProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const available = options.filter(o => !selected.includes(o))
  const filtered = query.length > 0
    ? available.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : available

  const add = (name: string) => {
    onChange([...selected, name])
    setQuery('')
    setOpen(false)
  }

  const remove = (name: string) => {
    onChange(selected.filter(n => n !== name))
  }

  const chevron = (
    <svg
      className={`ss-chevron${open ? ' open' : ''}`}
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )

  return (
    <div ref={wrapRef} className="ms-wrap">

      {/* Selected name tags */}
      {selected.length > 0 && (
        <div className="ms-tags">
          {selected.map(name => (
            <span key={name} className="ms-tag">
              {name}
              <button
                type="button"
                className="ms-tag-remove"
                onMouseDown={() => remove(name)}
                aria-label={`Remove ${name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="ss-input-row">
        <input
          type="text"
          className="form-input"
          placeholder={
            selected.length === 0
              ? 'Search for your name…'
              : 'Add another guest in your party…'
          }
          value={query}
          autoComplete="off"
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
        />
        {chevron}
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="ss-list" role="listbox">
          {filtered.length > 0 ? (
            filtered.map(name => (
              <li
                key={name}
                className="ss-option"
                role="option"
                aria-selected={false}
                onMouseDown={() => add(name)}
              >
                {name}
              </li>
            ))
          ) : (
            <li className="ss-empty">No matches found</li>
          )}
        </ul>
      )}
    </div>
  )
}

// ── Form ─────────────────────────────────────────────────────
interface FormData {
  names: string[]
  mailingAddress: string
  attending: string
  song: string
  note: string
}

const defaultForm: FormData = {
  names: [],
  mailingAddress: '',
  attending: '',
  song: '',
  note: '',
}

export default function RSVP() {
  const [form, setForm] = useState<FormData>(defaultForm)
  const [guestNames, setGuestNames] = useState<string[]>([])
  const [loadingGuests, setLoadingGuests] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [nameError, setNameError] = useState('')

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then(r => r.json())
      .then((names: string[]) => {
        setGuestNames([...names].sort((a, b) => a.localeCompare(b)))
        setLoadingGuests(false)
      })
      .catch(() => setLoadingGuests(false))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.names.length === 0) {
      setNameError('Please select at least one guest from your party.')
      return
    }
    setNameError('')
    setSubmitting(true)
    setSubmitError('')

    // Send names as a comma-separated string to the spreadsheet
    const payload = { ...form, name: form.names.join(', ') }

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSubmitError('Something went wrong — please try again or reach out to us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const displayName = form.names.length > 0 ? form.names[0] : 'there'

  // ── Success screen ────────────────────────────────────────
  if (submitted) {
    return (
      <div className="page">
        <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container-narrow" style={{ textAlign: 'center', margin: '0 auto' }}>
            <div className="rsvp-success">
              <div className="rsvp-success-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span className="section-label">We Got It!</span>
              <h1 className="section-title" style={{ marginTop: '8px' }}>
                {form.attending === 'yes' ? "We can't wait to see you!" : 'We will miss you!'}
              </h1>
              <div className="ornament" style={{ marginBottom: '28px' }}><span>✦</span></div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', color: 'var(--charcoal-light)', fontStyle: 'italic', lineHeight: 1.9 }}>
                {form.attending === 'yes'
                  ? `Thank you, ${displayName}! Your RSVP has been received. We are so excited to celebrate with you on September 18–19th.`
                  : `Thank you, ${displayName}. We completely understand and will be thinking of you on our big day.`}
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────
  return (
    <div className="page">
      <div
        className="page-hero has-photo"
        style={{ backgroundImage: "url('/images/RSVP.jpeg')", backgroundPosition: 'center 35%' }}
      >
        <span className="section-label">We Hope to See You There</span>
        <h1>RSVP</h1>
        <p>Please respond by July 1st, 2026</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="rsvp-intro">
            <p>
              We would be honored to have you celebrate with us. Please use the guest selector below to select everyone in your party. We can&apos;t wait!
            </p>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit}>

            {/* ── Guest names — multi-select ── */}
            <div className="form-group">
              <label className="form-label">Select All Guests in Your Party</label>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--warm-gray)', marginBottom: '8px', fontStyle: 'italic' }}>
                Only names on this list are invited. If you have questions about your invitation, please reach out to us directly.
              </p>
              {loadingGuests ? (
                <div className="form-input" style={{ color: 'var(--warm-gray)', fontStyle: 'italic' }}>
                  Loading guest list…
                </div>
              ) : guestNames.length > 0 ? (
                <>
                  <MultiSelectGuests
                    options={guestNames}
                    selected={form.names}
                    onChange={names => {
                      setForm(prev => ({ ...prev, names }))
                      setNameError('')
                    }}
                  />
                  {nameError && (
                    <p style={{ color: 'var(--gold-dark)', fontSize: '13px', marginTop: '6px', fontFamily: 'var(--font-sans)' }}>
                      {nameError}
                    </p>
                  )}
                </>
              ) : (
                // Fallback text input if sheet URL not connected yet
                <input
                  name="namesText"
                  type="text"
                  className="form-input"
                  placeholder="Your full name(s)"
                  onChange={e => setForm(prev => ({ ...prev, names: [e.target.value] }))}
                  required
                />
              )}
            </div>

            {/* ── Mailing Address ── */}
            <div className="form-group">
              <label className="form-label" htmlFor="mailingAddress">Mailing Address <span style={{ fontWeight: 500, fontStyle: 'italic', color: 'var(--warm-gray)' }}>— we&apos;ll send your formal invitation here</span></label>
              <input
                id="mailingAddress" name="mailingAddress" type="text"
                className="form-input"
                value={form.mailingAddress} onChange={handleChange}
                required autoComplete="street-address"
                placeholder="Street, City, State, Zip"
              />
            </div>

            {/* ── Attending ── */}
            <div className="form-group">
              <label className="form-label" htmlFor="attending">Will you be attending?</label>
              <select id="attending" name="attending" className="form-select" value={form.attending} onChange={handleChange} required>
                <option value="" disabled>Select one</option>
                <option value="yes">Joyfully accepts</option>
                <option value="no">Regretfully declines</option>
              </select>
            </div>

            {form.attending === 'yes' && (
              <div className="form-group">
                <label className="form-label" htmlFor="song">Song Request</label>
                <input id="song" name="song" type="text" className="form-input" value={form.song} onChange={handleChange} placeholder="What song will get you on the dance floor?" />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="note">A note for the couple (optional)</label>
              <textarea id="note" name="note" className="form-textarea" value={form.note} onChange={handleChange} placeholder="Share a message, a well-wish, or a favorite memory…" />
            </div>

            {submitError && (
              <p style={{ color: 'var(--gold-dark)', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                {submitError}
              </p>
            )}

            <div className="form-submit-row">
              <button type="submit" className="btn btn-dark" style={{ minWidth: '200px', opacity: submitting ? 0.7 : 1, background: 'var(--dark-blue)', borderColor: 'var(--dark-blue)', color: 'white' }} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send RSVP'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Questions ── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="closing-card" style={{
          background: '#F7F8E8',
          maxWidth: '640px',
          margin: '0 auto',
          padding: '64px 56px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        }}>
          <h2 className="section-title" style={{ color: '#B4B534', fontWeight: 700 }}>Questions?</h2>
          <div className="ornament"><span style={{ color: '#B4B534' }}>✦</span></div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '21px',
            fontWeight: 700,
            color: '#B4B534',
            fontStyle: 'italic',
            lineHeight: 1.9,
            marginTop: '24px',
            marginBottom: '24px',
          }}>
            Don&apos;t hesitate to reach out — we&apos;re happy to help with anything you need.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700, color: '#B4B534' }}>
            Tate Matley &nbsp;·&nbsp;
            <a href="tel:8012004361" style={{ color: 'var(--dark-blue)', textDecoration: 'none' }}>
              (801) 200-4361
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
