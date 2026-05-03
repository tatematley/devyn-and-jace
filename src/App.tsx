import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Schedule from './pages/Schedule'
import Travel from './pages/Travel'
import Registry from './pages/Registry'
import FAQ from './pages/FAQ'
import RSVP from './pages/RSVP'
import './index.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/rsvp" element={<RSVP />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
