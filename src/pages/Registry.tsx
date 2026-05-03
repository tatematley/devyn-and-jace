const registries = [
  {
    name: 'Crate & Barrel',
    url: 'https://www.crateandbarrel.com/gift-registry/devyn-matley-and-jace-davis/r7547893',
  },
  {
    name: 'Anthropologie',
    url: 'https://www.anthropologie.com/registry/listing?registryId=ABE13F3F9080',
  },
  {
    name: 'Williams Sonoma',
    url: '#',
  },
  {
    name: 'Our Newlywed Fund',
    url: 'https://venmo.com/u/jacedavis95',
  },
]

export default function Registry() {
  return (
    <div className="page" style={{ background: '#F7F8E8' }}>
      <div
        className="page-hero"
        style={{ background: '#F7F8E8', borderBottom: 'none' }}
      >
        <h1 style={{ color: '#B4B534' }}>Registry</h1>
      </div>

      <section className="section" style={{ background: '#F7F8E8', paddingTop: '24px' }}>
        <div className="container">
          <div className="registry-grid">
            {registries.map(({ name, url }) => (
              <div key={name} className="registry-card">
                <h2 className="registry-card-name">{name}</h2>
                <a
                  href={url}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="closing-card" style={{
          background: '#EAF2D0',
          maxWidth: '640px',
          margin: '0 auto',
          padding: '64px 56px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        }}>
          <span className="section-label" style={{ color: '#B4B534' }}>A Note from Us</span>
          <h2 className="section-title" style={{ color: '#B4B534', fontWeight: 700 }}>Thank You</h2>
          <div className="ornament"><span style={{ color: '#B4B534' }}>✦</span></div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '21px',
            fontWeight: 700,
            color: '#B4B534',
            fontStyle: 'italic',
            lineHeight: 1.9,
            marginTop: '28px',
          }}>
            Honestly, the greatest gift you can give us is showing up,
            celebrating with us, and making memories together. We are so
            lucky to be surrounded by the people we love.
          </p>
        </div>
      </section>
    </div>
  )
}
