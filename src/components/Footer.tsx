import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-names">Devyn &amp; Jace</span>
      <span className="footer-date">September 18–19, 2026 · Waynesboro, Virginia</span>

      <div className="footer-ornament">
        <span>✦</span>
      </div>

      <ul className="footer-nav">
        <li><Link to="/our-story">Our Story</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/travel">Travel</Link></li>
        <li><Link to="/registry">Registry</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/rsvp">RSVP</Link></li>
      </ul>

      <p className="footer-copy">Made with love &nbsp;✦&nbsp; Devyn &amp; Jace 2026</p>
    </footer>
  )
}
