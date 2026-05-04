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
            <p style={{ fontSize: '17px', lineHeight: 1.85, marginBottom: '24px', color: 'var(--warm-gray)' }}>
              We recommend searching <strong style={{ color: 'var(--charcoal-light)' }}>Airbnb</strong>,{' '}
              <strong style={{ color: 'var(--charcoal-light)' }}>Vrbo</strong>, or local hotels
              in Waynesboro, Staunton, Charlottesville, or surrounding areas.
            </p>
            <div className="hotel-grid" style={{ marginTop: '8px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#B4B534', marginBottom: '12px' }}>Waynesboro &amp; Staunton</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { name: 'Hampton Inn Waynesboro', url: 'https://maps.app.goo.gl/eKs6VXB8XHh1Zq8E6' },
                    { name: 'Holiday Inn Express & Suites Waynesboro', url: 'https://maps.app.goo.gl/8weamUpfBpTy3zh69' },
                    { name: 'Grey Pine Lodge', url: 'https://maps.app.goo.gl/dJ2qqPAq9FMXnVLT9' },
                    { name: 'Fairfield by Marriott — Staunton', url: 'https://maps.app.goo.gl/fB5PcAvon2NrfFe2A' },
                    { name: 'Berkeley House Bed & Breakfast', url: 'https://maps.app.goo.gl/i8ptqktWi4zRPGSTA' },
                    { name: 'The Historic Inn at Oakdene', url: 'https://maps.app.goo.gl/QRPXgviMkCbMWnJN9' },
                  ].map(({ name, url }) => (
                    <li key={name}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hotel-link">
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#B4B534', marginBottom: '12px' }}>Charlottesville</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { name: 'The Doyle Hotel', url: 'https://us1.cloudbeds.com/en/reservation/4yxBsz/' },
                    { name: 'DoubleTree by Hilton', url: 'https://www.guestreservations.com/doubletree-by-hilton-hotel-charlottesville/booking' },
                    { name: 'The Draftsman Hotel (Marriott)', url: 'https://www.marriott.com/reservation/rateListMenu.mi' },
                    { name: 'Piedmont Place Suites', url: 'https://www.vaguesthouses.com/piedmont-place-suites' },
                    { name: 'Home in Batesville (Airbnb)', url: 'https://www.airbnb.com/rooms/699194027975013505' },
                  ].map(({ name, url }) => (
                    <li key={name}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hotel-link">
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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


    </div>
  )
}
