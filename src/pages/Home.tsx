import { Link } from 'react-router-dom'
import Countdown from '../components/Countdown'

const weekendDays = [
  { id: 'thursday', date: 'Sep 17', day: 'Thursday', tagline: 'Welcome Weekend',  featured: false },
  { id: 'friday',   date: 'Sep 18', day: 'Friday',   tagline: 'Pre-Wedding Day',  featured: false },
  { id: 'saturday', date: 'Sep 19', day: 'Saturday', tagline: 'The Wedding',       featured: true  },
  { id: 'sunday',   date: 'Sep 20', day: 'Sunday',   tagline: 'Before You Go',    featured: false },
]

export default function Home() {
  return (
    <>
      {/* ── 1. Split Hero ── */}
      <section className="hero-split">
        <div className="hero-photo-panel" />
        <div className="hero-text-panel">
          <div className="hero-text-inner">
            <p className="hero-eyebrow">We&apos;re getting married</p>
            <h1 className="hero-names">Devyn<br />&amp; Jace</h1>
            <div className="hero-ornament">
              <span>✦ ✦ ✦</span>
            </div>
            <p className="hero-date">September 19, 2026</p>
            <p className="hero-location">Waynesboro, Virginia</p>
            <Link to="/rsvp" className="hero-rsvp-btn">RSVP</Link>
          </div>
        </div>
      </section>

      {/* ── 2. Countdown ── */}
      <section className="countdown-section">
        <span className="countdown-section-label">Until We Say I Do</span>
        <Countdown />
      </section>

      {/* ── 3. Our Story — full-bleed photo ── */}
      <section className="home-story-feature">
        <div className="home-story-content">
          <span className="section-label">A Love Story</span>
          <h2 className="section-title">Our Story</h2>
          <div className="ornament"><span>✦</span></div>
          <p>
            We can&apos;t wait to celebrate with each of you! Thanks for being part of our journey.
          </p>
          <Link to="/our-story" className="btn btn-light">Read Our Story</Link>
        </div>
      </section>

      {/* ── 4. Venue ── */}
      <section className="section" style={{ background: '#FAF7F2' }}>
        <div className="container">
          <div className="venue-grid">
            <div className="venue-illustration">
              <img src="/images/OakHill.png" alt="Oak Hill venue illustration" />
            </div>
            <div className="venue-details">
              <span className="section-label" style={{ color: '#B4B534' }}>The Venue</span>
              <h2 className="section-title" style={{ marginBottom: '8px' }}>Oak Hill</h2>
              <div className="ornament" style={{ justifyContent: 'flex-start', marginBottom: '0' }}>
                <span>✦</span>
              </div>
              <div className="venue-info">
                <div className="venue-info-item">
                  <span className="venue-info-label">Date</span>
                  <span className="venue-info-value">Saturday, September 19, 2026</span>
                </div>
                <div className="venue-info-item">
                  <span className="venue-info-label">Ceremony</span>
                  <span className="venue-info-value">4:45 PM &nbsp;·&nbsp; Please arrive by 4:30</span>
                </div>
                <div className="venue-info-item">
                  <span className="venue-info-label">Address</span>
                  <span className="venue-info-value">
                    388 Rockfish Rd.<br />Waynesboro, Virginia 22980
                  </span>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=388+Rockfish+Rd+Waynesboro+VA+22980"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Weekend Preview ── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="section-label">Join Us for a Full Weekend</span>
          <h2 className="section-title">A Weekend to Remember</h2>
          <div className="ornament"><span>✦</span></div>

          <div className="weekend-grid">
            {weekendDays.map(({ date, day, tagline, featured, id }) => (
              <Link
                key={day}
                to="/schedule"
                state={{ activeDay: id }}
                className={`weekend-card${featured ? ' weekend-card-featured' : ''}`}
              >
                <span className="weekend-card-date">{date}</span>
                <span className="weekend-card-day">{day}</span>
                <span className="weekend-card-tagline">{tagline}</span>
                <span className="weekend-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
