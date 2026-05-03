import { Link } from 'react-router-dom'

const airports = [
  {
    code: 'CHO',
    name: 'Charlottesville–Albemarle',
    distance: '30–40 min',
    note: 'Most convenient — closest to the venue.',
  },
  {
    code: 'RIC',
    name: 'Richmond International',
    distance: '~1.5 hrs',
    note: 'Good alternative with solid flight options.',
  },
  {
    code: 'IAD',
    name: 'Dulles International',
    distance: '~2.5 hrs',
    note: 'Washington Dulles — widest flight selection. *Check out Breeze Airways direct flights from Provo (PVU).',
  },
]

export default function Travel() {
  return (
    <div className="page">

      {/* ── Hero ── */}
      <div
        className="page-hero has-photo"
        style={{ backgroundImage: "url('/images/BlueRidgeParkway.jpg')", backgroundPosition: 'center 55%' }}
      >
        <span className="section-label">Getting Here &amp; Getting Around</span>
        <h1>Travel</h1>
      </div>

      {/* ── Getting Here ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Flying In</h2>
            <div className="ornament"><span>✦</span></div>
          </div>

          <div className="airport-grid">
            {airports.map(({ code, name, distance, note }) => (
              <div key={code} className="airport-card">
                <span className="airport-code">{code}</span>
                <h3 className="airport-name">{name}</h3>
                <span className="airport-distance">{distance} from venue</span>
                <p className="airport-note">{note}</p>
              </div>
            ))}
          </div>

          <p className="travel-car-note">
            We recommend renting a car — rideshare options are limited in rural areas.
          </p>
        </div>
      </section>

      {/* ── Where to Stay ── */}
      <section className="section" style={{ background: '#F7F8E8' }}>
        <div className="container">
          <div className="stay-card">
            <span className="section-label">Accommodations</span>
            <h2 className="section-title">Where to Stay</h2>
            <div className="ornament"><span>✦</span></div>
            <p style={{ fontSize: '17px', lineHeight: 1.85, marginBottom: '12px', marginTop: '24px', color: 'var(--warm-gray)' }}>
              All wedding activities take place within 10 minutes of{' '}
              <strong style={{ color: 'var(--charcoal-light)' }}>388 Rockfish Rd, Waynesboro, VA 22980</strong>.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--warm-gray)' }}>
              We recommend searching <strong style={{ color: 'var(--charcoal-light)' }}>Airbnb</strong>,{' '}
              <strong style={{ color: 'var(--charcoal-light)' }}>Vrbo</strong>, or local hotels
              in Waynesboro and Staunton.
            </p>
          </div>
        </div>
      </section>

      {/* ── Things to Do & Places to Eat — link to Schedule ── */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container-narrow">
          <span className="section-label">Explore &amp; Eat</span>
          <h2 className="section-title">Things to Do &amp; Places to Eat</h2>
          <div className="ornament"><span>✦</span></div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '20px',
            fontStyle: 'italic',
            color: 'var(--warm-gray)',
            lineHeight: 1.9,
            margin: '24px 0 36px',
          }}>
            From Blue Ridge hikes to historic estates to local restaurants —
            we&apos;ve got a full list of our favorite spots on the Schedule page.
          </p>
          <Link
            to="/schedule"
            state={{ activeDay: 'sunday' }}
            className="btn btn-dark" style={{ background: 'var(--dark-blue)', borderColor: 'var(--dark-blue)' }}
          >
            View Things to Do &amp; Places to Eat
          </Link>
        </div>
      </section>

      {/* ── Venue Map ── */}
      <section className="section" style={{ background: '#EAF2D0', paddingBottom: '64px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Venue</span>
            <h2 className="section-title">Oak Hill</h2>
            <div className="ornament"><span>✦</span></div>
            <p className="section-subtitle" style={{ marginTop: '12px' }}>
              388 Rockfish Rd · Waynesboro, Virginia 22980
            </p>
          </div>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <iframe
              title="Wedding Venue — Oak Hill, Waynesboro Virginia"
              src="https://maps.google.com/maps?q=388+Rockfish+Rd,+Waynesboro,+VA+22980&output=embed&z=14"
              className="travel-map-wrap"
              style={{ height: '520px' }}
              loading="lazy"
              allowFullScreen
            />
          </div>
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
          <span className="section-label" style={{ color: '#B4B534' }}>Need Help?</span>
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
            Don&apos;t hesitate to reach out — we want your trip to be as
            seamless and enjoyable as possible.
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '18px',
            fontWeight: 700,
            color: '#B4B534',
          }}>
            Tate &nbsp;·&nbsp;
            <a href="tel:8012004361" style={{ color: 'var(--dark-blue)', textDecoration: 'none' }}>
              (801) 200-4361
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
