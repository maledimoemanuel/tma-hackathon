import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Schedule from './components/Schedule'
import Prizes from './components/Prizes'
import Judges from './components/Judges'
import FunUploads from './components/FunUploads'
import FunUploadsAdmin from './components/FunUploadsAdmin'

function App() {
  return (
    <Router>
      <Routes>
        {/* Main landing page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Schedule />
              <Prizes />
              <Judges />
            </>
          }
        />
        {/* Fun Uploads Page */}
        <Route path="/fun-uploads" element={<FunUploads />} />
        <Route path="/fun-uploads-admin" element={<FunUploadsAdmin />} />
      </Routes>
    </Router>
  )
}

export default App
