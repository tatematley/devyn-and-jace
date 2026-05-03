import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar scrolled">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        D &amp; J
      </Link>

      <button
        className={`navbar-toggle${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li>
          <NavLink to="/our-story" onClick={closeMenu}>Our Story</NavLink>
        </li>
        <li>
          <NavLink to="/schedule" onClick={closeMenu}>Schedule</NavLink>
        </li>
        <li>
          <NavLink to="/travel" onClick={closeMenu}>Travel</NavLink>
        </li>
        <li>
          <NavLink to="/registry" onClick={closeMenu}>Registry</NavLink>
        </li>
        <li>
          <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
        </li>
        <li>
          <NavLink to="/rsvp" className="nav-rsvp" onClick={closeMenu}>RSVP</NavLink>
        </li>
      </ul>
    </nav>
  )
}
