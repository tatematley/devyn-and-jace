import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

interface Restaurant { name: string; url?: string }
interface RestaurantCity { city: string; places: Restaurant[] }

const restaurantsByCity: RestaurantCity[] = [
  {
    city: 'Waynesboro, VA',
    places: [
      { name: "Kline's Dairy Bar ★" },
      { name: 'Blue Mountain Brewery' },
      { name: 'Happ Cafe', url: 'https://maps.app.goo.gl/jw2kQ4ZfA2Hd2sNw5?g_st=ic' },
      { name: 'The River Burger Bar' },
      { name: 'Delly Up' },
      { name: 'Royal India Palace' },
      { name: 'Bonobos Bakery' },
      { name: "Ciro's Pizza" },
    ],
  },
  {
    city: 'Staunton, VA',
    places: [
      { name: 'Chophouse', url: 'https://maps.app.goo.gl/BZZXPtUFKpatbeHz5?g_st=ic' },
      { name: 'Chicano Boy', url: 'https://maps.app.goo.gl/uxywqpyFgS9m4jEu6?g_st=ic' },
      { name: 'Pizza Luca', url: 'https://maps.app.goo.gl/7F6M81Y7LdPNdKh69?g_st=ic' },
      { name: 'Remedy Burger', url: 'https://maps.app.goo.gl/wtYBrBGRw2Dya9kA9?g_st=ic' },
    ],
  },
  {
    city: 'Charlottesville, VA',
    places: [
      { name: 'Oak Heart Social', url: 'https://maps.app.goo.gl/rMUATCAQBJLDS9yg8?g_st=ic' },
      { name: 'The Local' },
      { name: "Marie Bette's Bakery" },
    ],
  },
]

interface Event {
  time: string
  name: string
  cursivePrefix?: string
  citronName?: boolean
  desc?: string
  faqNote?: boolean
  address?: string
  highlight?: boolean
  url?: string
  instagram?: string
  parkingImg?: string
}

interface Day {
  id: string
  tab: string
  shortTab: string
  scriptName: string
  date: string
  optional?: boolean
  tagline?: string
  note?: string
  noteDetail?: string
  noteBody?: string
  noteBullets?: string[]
  noteFooter?: string
  photo?: string
  events: Event[]
}

const days: Day[] = [
  {
    id: 'thursday',
    tab: 'Thursday',
    shortTab: 'Thurs',
    scriptName: 'Thursday',
    date: 'September 17',
    optional: true,
    note: 'For those arriving early, we would love you to join us at Carter Mountain Orchard.',
    noteDetail: 'Carter Mountain is conveniently located between the Charlottesville airport and Waynesboro — a perfect first stop on your way in to town.',
    noteBody: 'Carter Mountain Orchard is a Charlottesville summer staple and a great way to spend a Thursday evening.\n\nNo group plan here since it\'s open to the public, but there\'s a good chance you\'ll run into fellow guests soaking up the same view. Come if you can, no pressure either way!',
    noteBullets: [
      '$10/person entrance',
      'Grab tickets in advance — it fills up fast on nice days',
      'Food trucks on site',
      'Fruit picking available (pricing on their website, or pay on arrival)',
    ],
    noteFooter: 'We\'re hoping to make it ourselves, wedding prep permitting!',
    photo: '/images/CarterMountain.jpeg',
    events: [
      {
        time: 'Evening',
        name: 'Carter Mountain Orchard',
        desc: 'Fruit picking, live music, food trucks & a beautiful Virginia sunset',
        url: 'https://www.chilesfamilyorchards.com/',
        highlight: true,
      },
    ],
  },
  {
    id: 'friday',
    tab: 'Friday',
    shortTab: 'Fri',
    scriptName: 'Friday',
    date: 'September 18',
    events: [
      {
        time: '2–4 PM',
        name: 'Cyrus Ridge Farm — Visit the Miniature Highland Cows',
        desc: 'Come meet our cuddly cows!',
        instagram: 'https://www.instagram.com/cyrusridgefarm/',
        address: '77 Singing Hill Ln, Waynesboro, VA',
      },
      {
        time: '5 PM',
        name: 'BBQ',
        cursivePrefix: 'I Do ',
        desc: "Join us at Devyn's grandparents' backyard for a yummy BBQ and yard games! (Casual attire) — It's a long driveway, head all the way up!",
        address: '1 Entry School Rd. Waynesboro, VA 22980',
        highlight: true,
      },
    ],
  },
  {
    id: 'saturday',
    tab: 'Saturday',
    shortTab: 'Sat',
    scriptName: 'Saturday',
    date: 'September 19',
    tagline: 'The Wedding Day',
    events: [
      {
        time: '4:30 PM',
        name: 'Ceremony',
        desc: 'Please arrive at 4:30 PM. The ceremony will begin promptly at 4:45 PM.',
        faqNote: true,
        address: '388 Rockfish Rd. Waynesboro, VA 22980',
        parkingImg: '/images/Parking.JPEG',
        highlight: true,
      },
      {
        time: 'Evening',
        name: "Hors d'Oeuvres, Dinner, Dancing & Send Off",
        citronName: true,
        highlight: true,
      },
    ],
  },
  {
    id: 'sunday',
    tab: 'Sunday',
    shortTab: 'Sun',
    scriptName: 'Sunday',
    date: 'September 20',
    optional: true,
    events: [
      {
        time: '12 PM',
        name: 'Polo Match',
        desc: 'A quintessentially Virginia Sunday at King Family Vineyards in Crozet',
        url: 'https://www.kingfamilyvineyards.com/polo',
        highlight: true,
      },
    ],
  },
]

const VENUE = '388 Rockfish Rd, Waynesboro, VA 22980'

interface Activity {
  name: string
  desc: string
  url: string
  mapsQuery?: string
}

const activities: Activity[] = [
  // Fruit Picking
  {
    name: 'Chiles Family Orchards — Fruit Picking',
    desc: 'Pick your own peaches, apples, and more — a Virginia tradition',
    url: 'https://chilesfamilyorchards.com/chiles-peach-orchard/',
    mapsQuery: 'Chiles Family Orchards, Crozet, VA',
  },
  {
    name: 'Carter Mountain Orchard',
    desc: 'Apple & peach picking, cider, and stunning mountain views',
    url: 'https://chilesfamilyorchards.com/carter-mountain-orchard/',
    mapsQuery: 'Carter Mountain Orchard, Charlottesville, VA',
  },
  // Hikes
  {
    name: "Reed's Gap Trail",
    desc: '2.5 miles south on the Appalachian Trail — great panoramic views',
    url: 'https://www.alltrails.com/en-gb/trail/us/virginia/dripping-rock-south-via-appalachian-trail?sh=sh4ykz&utm_medium=trail_share&utm_source=alltrails_virality',
    mapsQuery: "Reed's Gap, Blue Ridge Parkway, VA",
  },
  {
    name: 'Dripping Rock Hike',
    desc: '25 min each way — short, accessible hike with a gorgeous overlook',
    url: 'https://www.alltrails.com/en-gb/trail/us/virginia/dripping-rock-south-via-appalachian-trail',
    mapsQuery: 'Dripping Rock Trail, Waynesboro, VA',
  },
  {
    name: 'Blackrock Summit',
    desc: 'Scenic Appalachian Trail summit hike with stunning valley views',
    url: 'https://www.alltrails.com/en-gb/trail/us/virginia/blackrock-summit-via-trayfoot-mountain-and-appalachian-trail?sh=sh4ykz&utm_medium=trail_share&utm_source=alltrails_virality',
    mapsQuery: 'Blackrock Summit, Shenandoah National Park, VA',
  },
  {
    name: 'Humpback Rocks Recreation Area ★',
    desc: "The bride's favorite! Stunning views — only 1.8 miles but a good climb. Not for the faint of heart.",
    url: 'https://www.alltrails.com/en-gb/trail/us/virginia/humpback-rocks-recreation-area',
    mapsQuery: 'Humpback Rocks Recreation Area, VA',
  },
  // Outdoor
  {
    name: 'Blue Ridge Parkway Drive',
    desc: 'One of the most scenic drives in the country — especially stunning in fall',
    url: '#',
    mapsQuery: 'Afton Mountain Blue Ridge Parkway, VA',
  },
  {
    name: 'South River Greenway',
    desc: 'A paved 1.2-mile scenic walking and biking path along the South River through Waynesboro',
    url: '#',
    mapsQuery: 'South River Greenway, Waynesboro, VA',
  },
  {
    name: 'Sherando Lake',
    desc: 'Beautiful mountain lake — swimming, kayaking, and relaxing. $10 cash park entrance.',
    url: '#',
    mapsQuery: 'Sherando Lake Recreation Area, VA',
  },
  {
    name: 'Virginia Safari Park',
    desc: 'Drive-through wildlife adventure in Natural Bridge',
    url: 'https://www.virginiasafaripark.com',
    mapsQuery: 'Virginia Safari Park, Natural Bridge, VA',
  },
  {
    name: 'Wintergreen Resort',
    desc: 'Mountain resort with hiking, spa, golf, and breathtaking views',
    url: 'https://www.wintergreenresort.com/',
    mapsQuery: 'Wintergreen Resort, VA',
  },
  {
    name: 'Mt. Crawford Creamery',
    desc: 'Fresh, locally made ice cream in the Shenandoah Valley',
    url: 'https://maps.app.goo.gl/ZJ4fymnJETQGuwvB6?g_st=ic',
    mapsQuery: 'Mt Crawford Creamery, VA',
  },
  {
    name: 'Polo Match at King Family Vineyards',
    desc: 'Sundays at King Family Vineyards in Crozet',
    url: 'https://www.kingfamilyvineyards.com/polo',
    mapsQuery: 'King Family Vineyards, Crozet, VA',
  },
  // Historic Sites
  {
    name: 'Monticello',
    desc: "Thomas Jefferson's iconic estate & gardens",
    url: 'https://www.monticello.org/',
    mapsQuery: 'Monticello, Charlottesville, VA',
  },
  {
    name: 'Montpelier',
    desc: "James Madison's historic plantation home",
    url: 'https://www.montpelier.org',
    mapsQuery: 'Montpelier Estate, Orange, VA',
  },
  {
    name: "James Monroe's Highland",
    desc: "The fifth president's mountain retreat",
    url: 'https://highland.org',
    mapsQuery: 'Highland James Monroe Estate, VA',
  },
  {
    name: 'Woodrow Wilson House',
    desc: "The 28th president's birthplace & museum in downtown Staunton",
    url: 'https://woodrowwilsonhouse.org',
    mapsQuery: 'Woodrow Wilson Presidential Library, Staunton, VA',
  },
  {
    name: 'Virginia Military Institute',
    desc: 'Free tour at noon — meet in the basement of the campus chapel museum. 4 PM drills most days. Robert E. Lee Chapel is on the neighboring Washington & Lee campus.',
    url: 'https://www.vmi.edu/',
    mapsQuery: 'Virginia Military Institute, Lexington, VA',
  },
  {
    name: 'University of Virginia',
    desc: "Mr. Jefferson's University — stunning historic architecture",
    url: 'https://www.virginia.edu/visit-uva/',
    mapsQuery: 'University of Virginia, Charlottesville, VA',
  },
  {
    name: 'Washington & Lee University',
    desc: 'Beautiful historic campus in Lexington, VA',
    url: 'https://www.wlu.edu/',
    mapsQuery: 'Washington and Lee University, Lexington, VA',
  },
  {
    name: 'Southern Virginia University',
    desc: 'Beautiful campus in Buena Vista, VA',
    url: 'https://svu.edu/visit/',
    mapsQuery: 'Southern Virginia University, Buena Vista, VA',
  },
]

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function AddressLine({ address }: { address: string }) {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="schedule-address"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      {address}
    </a>
  )
}

export default function Schedule() {
  const location = useLocation()
  const [activeDay, setActiveDay] = useState<string>(
    (location.state as { activeDay?: string } | null)?.activeDay ?? 'thursday'
  )

  useEffect(() => {
    const stateDay = (location.state as { activeDay?: string } | null)?.activeDay
    setActiveDay(stateDay ?? 'thursday')
  }, [location.key])
  const current = days.find(d => d.id === activeDay)!

  return (
    <div className="page">
      <div
        className="page-hero has-photo"
        style={{ backgroundImage: "url('/images/mountains.jpg')", backgroundPosition: 'center 40%' }}
      >
        <span className="section-label">Plan Your Visit</span>
        <h1>Schedule</h1>
        <p>A weekend of celebration in Waynesboro, Virginia</p>
      </div>

      {/* Day tabs */}
      <section className="section" style={{ background: 'var(--warm-white)' }}>
        <div className="container">
          <div className="schedule-tabs">
            {days.map(day => (
              <button
                key={day.id}
                className={`schedule-tab${activeDay === day.id ? ' active' : ''}`}
                onClick={() => setActiveDay(day.id)}
              >
                <span className="tab-full">{day.tab}</span>
                <span className="tab-short">{day.shortTab}</span>
              </button>
            ))}
          </div>

          <div className="schedule-day active">
            <div className="schedule-day-header">
              <div className="schedule-day-name">{current.scriptName}</div>
              <div className="schedule-day-date">
                {current.date}
                {current.optional && (
                  <span className="schedule-optional-badge">Optional Event</span>
                )}
                {current.tagline && !current.optional && (
                  <span style={{ color: 'var(--gold-dark)' }}>{current.tagline}</span>
                )}
              </div>
              {current.note && (
                <p className="schedule-day-note">{current.note}</p>
              )}
              {current.noteDetail && (
                <p className="schedule-day-note" style={{ marginTop: '8px', fontSize: '15px' }}>
                  {current.noteDetail}
                </p>
              )}
              {current.noteBody && current.noteBody.split('\n\n').map((para, i) => (
                <p key={i} className="schedule-day-note" style={{ marginTop: '12px', fontSize: '15px' }}>{para}</p>
              ))}
              {current.noteBullets && (
                <ul style={{ marginTop: '12px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {current.noteBullets.map((b, i) => (
                    <li key={i} className="schedule-day-note" style={{ fontSize: '15px', listStyleType: 'disc' }}>{b}</li>
                  ))}
                </ul>
              )}
              {current.noteFooter && (
                <p className="schedule-day-note" style={{ marginTop: '12px', fontSize: '15px', fontStyle: 'italic' }}>
                  {current.noteFooter}
                </p>
              )}
            </div>

            {current.photo && (
              <div className="schedule-day-photo">
                <img src={current.photo} alt={`${current.scriptName} — ${current.tagline || ''}`} />
              </div>
            )}

            <ul className="schedule-events">
              {current.events.map((event, i) => (
                <li key={i} className={`schedule-event${event.highlight ? ' highlight' : ''}`}>
                  <span className="schedule-time">{event.time}</span>
                  <div>
                    {event.url ? (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="schedule-event-name"
                      >
                        {event.name}
                        <ExternalLinkIcon />
                      </a>
                    ) : (
                      <div className="schedule-event-name" style={event.citronName ? { color: '#B4B534' } : undefined}>
                        {event.cursivePrefix && (
                          <span style={{ fontFamily: 'var(--font-script)', fontStyle: 'italic', fontSize: '1.15em' }}>
                            {event.cursivePrefix}
                          </span>
                        )}
                        {event.name}
                      </div>
                    )}
                    {event.desc && (
                      <div className="schedule-event-desc">{event.desc}</div>
                    )}
                    {event.faqNote && (
                      <div className="schedule-event-desc" style={{ marginTop: '4px' }}>
                        See <Link to="/faq" style={{ color: 'var(--dark-blue)', textDecoration: 'underline' }}>FAQ</Link> for dress code and more details
                      </div>
                    )}
                    {event.instagram && (
                      <a href={event.instagram} target="_blank" rel="noopener noreferrer" className="schedule-address" style={{ marginTop: '6px' }}>
                        Cyrus Ridge Farm Instagram →
                      </a>
                    )}
                    {event.address && (
                      <AddressLine address={event.address} />
                    )}
                    {event.parkingImg && (
                      <div className="schedule-parking">
                        <span className="schedule-parking-label">Parking</span>
                        <p className="schedule-parking-instructions">
                          Please park in the designated field shown on the map.<br />
                          Enter from Rockfish Rd right next to Misty Hill Ln.<br />
                          Follow the signs.
                        </p>
                        <a href={event.parkingImg} target="_blank" rel="noopener noreferrer" title="View full parking map">
                          <img
                            src={event.parkingImg}
                            alt="Parking map for Oak Hill"
                            className="schedule-parking-img"
                          />
                        </a>
                        <a href={event.parkingImg} target="_blank" rel="noopener noreferrer" className="schedule-address" style={{ marginTop: '4px' }}>
                          View full map →
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="schedule-explore-hint">
              Have free time? See activity &amp; dining suggestions below ↓
            </p>
          </div>

        </div>
      </section>

      {/* Activity suggestions */}
      <section className="section" style={{ background: '#EAF2D0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label" style={{ color: '#B4B534' }}>Explore the Area</span>
            <h2 className="section-title" style={{ color: '#B4B534' }}>Activity Suggestions</h2>
            <div className="ornament"><span style={{ color: '#B4B534' }}>✦</span></div>
            <p className="section-subtitle" style={{ marginTop: '20px', color: 'var(--charcoal)' }}>
              The Shenandoah Valley has so much to offer. Click any to learn more.
            </p>
          </div>

          <div className="activities-grid">
            {activities.map(({ name, desc, url, mapsQuery }) => {
              const directionsUrl = mapsQuery
                ? `https://www.google.com/maps/dir/${encodeURIComponent(VENUE)}/${encodeURIComponent(mapsQuery)}`
                : null

              const inner = (
                <>
                  <div className="activity-name">
                    {name}
                    {url !== '#' && <ExternalLinkIcon />}
                  </div>
                  {desc && <div className="activity-desc">{desc}</div>}
                  {directionsUrl && (
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="activity-directions"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      Directions from venue
                    </a>
                  )}
                </>
              )

              return url === '#' ? (
                <div key={name} className="activity-card">{inner}</div>
              ) : (
                <a key={name} className="activity-card activity-card-link" href={url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Places to Eat ── */}
      <section className="section" style={{ background: '#F7F8E8' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Local Favorites</span>
            <h2 className="section-title">Places to Eat</h2>
            <div className="ornament"><span>✦</span></div>
          </div>
          <div className="restaurants-grid">
            {restaurantsByCity.map(({ city, places }) => (
              <div key={city} className="restaurant-city-col">
                <h3 className="restaurant-city-name">{city}</h3>
                <ul className="restaurant-list">
                  {places.map(({ name, url }) => (
                    <li key={name}>
                      {url ? <a href={url} target="_blank" rel="noopener noreferrer">{name}</a> : name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="section" style={{ background: '#EAF2D0', textAlign: 'center' }}>
        <div className="container-narrow">
          <span className="section-label" style={{ color: '#B4B534' }}>See You There</span>
          <h2 className="section-title" style={{ color: '#B4B534' }}>September 18–19, 2026</h2>
          <div className="ornament"><span style={{ color: '#B4B534' }}>✦</span></div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '21px',
            color: '#B4B534',
            fontStyle: 'italic',
            lineHeight: 1.9,
            marginTop: '24px',
          }}>
            We can&apos;t wait to celebrate with you in the beautiful Shenandoah Valley.
          </p>
        </div>
      </section>
    </div>
  )
}
