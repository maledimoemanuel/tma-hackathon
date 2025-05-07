import React, { useState, useEffect } from 'react';
import heroBg from '../assets/hero.png';

export default function About() {
  const [isLocked, setIsLocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Lock from Monday May 5th at 12:00:00 until May 15th at 9:00 AM
    const lockStart = new Date("2025-05-05T12:00:00").getTime();
    const lockEnd = new Date("2025-05-15T09:30:00").getTime();
    const now = new Date().getTime();

    setIsLocked(now >= lockStart && now < lockEnd);

    // Update countdown timer if locked
    if (isLocked) {
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const distance = lockEnd - currentTime;
        
        if (distance < 0) {
          setIsLocked(false);
          clearInterval(timer);
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLocked]);

  const LockedContent = ({ title }) => (
    <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/50 text-center">
  <div className="text-5xl mb-6">🔒</div>
  <h3 className="text-2xl font-bold mb-4 text-purple-400">{title} Locked</h3>
  <p className="text-xl text-gray-300 mb-6">
    This content will unlock at 9:30 AM on May 15, 2025
  </p>
  <div className="flex justify-center gap-4 text-center font-mono mt-8 flex-wrap">
    <div className="countdown-item">
      <span className="text-3xl font-bold">{timeLeft.days}</span>
      <span className="text-sm text-gray-400 block">
        <span className="hidden sm:inline">Days</span>
        <span className="inline sm:hidden">d</span>
      </span>
    </div>
    <div className="countdown-item">
      <span className="text-3xl font-bold">{timeLeft.hours}</span>
      <span className="text-sm text-gray-400 block">
        <span className="hidden sm:inline">Hours</span>
        <span className="inline sm:hidden">hr</span>
      </span>
    </div>
    <div className="countdown-item">
      <span className="text-3xl font-bold">{timeLeft.minutes}</span>
      <span className="text-sm text-gray-400 block">
        <span className="hidden sm:inline">Minutes</span>
        <span className="inline sm:hidden">min</span>
      </span>
    </div>
    <div className="countdown-item">
      <span className="text-3xl font-bold">{timeLeft.seconds}</span>
      <span className="text-sm text-gray-400 block">
        <span className="hidden sm:inline">Seconds</span>
        <span className="inline sm:hidden">s</span>
      </span>
    </div>
  </div>
</div>
  );

  return (
    <section id="about" className="relative min-h-screen py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-90"></div>
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 text-white">
        {/* Section Header */}
        <div className="text-center mb-20 pt-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              Business Innovation Sprint
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A 2-day intensive where Africa's brightest minds solve pressing business challenges
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {isLocked ? (
              <LockedContent title="The Challenge" />
            ) : (
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">The Challenge</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  At <strong>TMA Hackathon 2025</strong>, a business plan isn't just a document it's a strategic tool.
                  Teams will craft focused, actionable plans that outline scalable solutions, process innovations, and operational strategies tailored for African enterprises.
                </p>
                <ul className="space-y-3 text-gray-300">
                  {[
                    "Prioritize realistic, data-driven decision-making",
                    "Communicate clearly with concise, impactful language",
                    "Support ideas with compelling visuals (charts, workflows, frameworks)",
                    "Align your plan with your target audience whether internal teams or executive panels",
                    "Treat the plan as a living document that evolves with your business vision"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

<div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/50">
  <h3 className="text-2xl font-bold mb-6 text-orange-400">Who Should Join</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {[
      { title: "Operations Managers", color: "purple" },
      { title: "Business Analysts", color: "orange" },
      { title: "Process Engineers", color: "purple" },
      { title: "Strategy Consultants", color: "orange" },
      { title: "Supply Chain Experts", color: "purple" },
      { title: "Entrepreneurs", color: "orange" }
    ].map((role, index) => (
      <div
        key={index}
        className={`rounded-xl p-4 border ${
          role.color === "purple"
            ? "border-purple-600 text-purple-400"
            : "border-orange-400 text-orange-400"
        }`}
      >
        <h4 className="font-bold text-lg text-center">{role.title}</h4>
      </div>
    ))}
  </div>
</div>
</div>

          {/* Right Column */}
          <div className="space-y-8">
            {isLocked ? (
              <LockedContent title="2-Day Sprint Agenda" />
            ) : (
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-orange-900/50">
                <h3 className="text-2xl font-bold mb-6 text-white">2-Day Sprint Agenda</h3>
                <div className="space-y-6">
                  {[
                    { 
                      day: "Day 1", 
                      title: "Problem Framing & Solution Design", 
                      activities: [
                        "Team formation & challenge selection",
                        "Welcome session and introduction to real business challenges.",
                        "Start shaping your solution using the Business Model Canvas."
                      ] 
                    },
                    { 
                      day: "Day 2", 
                      title: "Development & Refinement", 
                      activities: [
                        "Build a simple financial model and map out your impact.",
                        "Sketch out key components of your solution and gather early feedback.",
                        "Final presentations & judging"
                      ] 
                    }
                  ].map((day, index) => (
                    <div key={index} className="border-l-2 border-purple-500 pl-6">
                      <div className="text-purple-400 font-bold mb-2">{day.day}</div>
                      <h4 className="text-xl font-semibold mb-3 text-orange-300">{day.title}</h4>
                      <ul className="space-y-2 text-gray-300">
                        {day.activities.map((activity, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-orange-400 mr-2">▹</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-purple-900/40 to-orange-900/30 p-8 rounded-2xl border border-purple-800/30">
              <h3 className="text-2xl font-bold mb-4 text-white">Why Participate</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: "💼", title: "Share Your Ideas", desc: "Bring your insights to the table and shape practical solutions." },
                  { icon: "🌍", title: "Solve Real Challenges", desc: "Tackle problems that matter to our teams and operations." },
                  { icon: "🤝", title: "Collaborate Across Teams", desc: "Work with colleagues from different departments and skill sets." },
                  { icon: "🏆", title: "Prizes", desc: "Exciting prizes for the winning team" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-purple-300">{item.title}</h4>
                      <p className="text-sm text-gray-300">{item.descs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-300 mb-8">
            Ready to transform African business operations?
          </p>
        </div>
      </div>
    </section>
  );
}