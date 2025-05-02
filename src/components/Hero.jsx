import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import visionProBg from '../assets/hero.png';

export default function Hero() {
  const eventDate = new Date("2025-05-15T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      if (distance < 0) return clearInterval(timer);
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white font-inter relative min-h-screen overflow-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/90 backdrop-blur-md py-2 shadow-lg" : "py-4"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="hero" smooth duration={500} className="cursor-pointer hover:text-purple-400 transition-colors font-semibold text-white text-lg">TMA</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm">
            {["about", "schedule", "prizes", "judges"].map(section => (
              <Link
                key={section}
                to={section}
                smooth
                duration={500}
                className="cursor-pointer hover:text-purple-400 transition-colors"
                spy={true}
                activeClass="text-purple-400"
              >
                {section.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
              </Link>
            ))}
            <RouterLink
              to="/fun-uploads"
              className="cursor-pointer hover:text-purple-400 transition-colors"
            >
              Fun Uploads
            </RouterLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm py-4 px-4">
            <div className="flex flex-col space-y-4">
              {["about", "schedule", "prizes", "judges"].map(section => (
                <Link
                  key={section}
                  to={section}
                  smooth
                  duration={500}
                  className="cursor-pointer hover:text-purple-400 transition-colors py-2"
                  spy={true}
                  activeClass="text-purple-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {section.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
                </Link>
              ))}
              <RouterLink
                to="/fun-uploads"
                className="cursor-pointer hover:text-purple-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fun Uploads
              </RouterLink>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-16 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl w-full mb-12 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              TMA Hackathon 2025
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
            Africa's leading innovation sprint business minds, bold ideas, and real-world impact in just 48 hours.
          </p>
          <ul className="text-xs sm:text-sm text-gray-400 space-y-1 mb-8">
            <li><strong className="text-purple-400">When:</strong> May 15–16, 2025</li>
            <li><strong className="text-purple-400">Where:</strong> On-site (WeWork, Sandton)</li>
            <li><strong className="text-purple-400">Theme:</strong> "Startup Solutions for Africa's Biggest Challenges"</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="about" 
              smooth 
              duration={500}
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-medium shadow transition-all text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Countdown */}
        <div className="w-full md:w-auto mt-8 md:mt-0 relative flex flex-col items-center">
          <div
            className="w-full max-w-xs sm:max-w-md h-64 sm:h-72 md:h-80 bg-center bg-no-repeat bg-contain flex items-center justify-center"
            style={{ backgroundImage: `url(${visionProBg})` }}
          >
            <div className="flex gap-2 sm:gap-4 text-center font-mono text-white text-lg sm:text-xl font-semibold px-4 sm:px-6 py-4 rounded-lg">
              <div className="flex flex-col items-center">
                <span>{timeLeft.days}</span>
                <span className="text-xs mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{timeLeft.hours}</span>
                <span className="text-xs mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{timeLeft.minutes}</span>
                <span className="text-xs mt-1">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{timeLeft.seconds}</span>
                <span className="text-xs mt-1">Seconds</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400 text-center">
            The hackathon starts in <span className="text-orange-400">{timeLeft.days}</span> days
          </p>
        </div>
      </div>
    </section>
  );
}