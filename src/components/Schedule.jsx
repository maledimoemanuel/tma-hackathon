import React, { useState, useEffect } from "react";

const hackathonStartTime = new Date("2025-05-15T09:00:00").getTime();
const scheduleLockTime = new Date("2025-05-05T12:00:00").getTime();

export default function Schedule() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isLocked, setIsLocked] = useState(
    currentTime < hackathonStartTime && currentTime >= scheduleLockTime
  );
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      setIsLocked(now < hackathonStartTime && now >= scheduleLockTime);

      // Calculate time left if locked
      if (now < hackathonStartTime && now >= scheduleLockTime) {
        const distance = hackathonStartTime - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLocked) {
    return (
      <section id="schedule" className="relative min-h-[50vh] py-20 overflow-hidden">

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              Event Schedule
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto mb-8"></div>
          
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/50 max-w-2xl mx-auto">
            <div className="text-5xl mb-6">🔒</div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Schedule Locked</h3>
            <p className="text-xl text-gray-300 mb-6">
              The detailed schedule will unlock at 9:00 AM on May 15, 2025
            </p>
            
            <div className="flex justify-center gap-4 text-center font-mono mt-8">
              <div className="countdown-item">
                <span className="text-3xl font-bold">{timeLeft.days}</span>
                <span className="text-sm text-gray-400">Days</span>
              </div>
              <div className="countdown-item">
                <span className="text-3xl font-bold">{timeLeft.hours}</span>
                <span className="text-sm text-gray-400">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="text-3xl font-bold">{timeLeft.minutes}</span>
                <span className="text-sm text-gray-400">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="text-3xl font-bold">{timeLeft.seconds}</span>
                <span className="text-sm text-gray-400">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className="relative min-h-[50vh] py-20 overflow-hidden">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              Business Sprint Schedule
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Two intensive days of business innovation and operational excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Day 1 */}
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/50">
            <h3 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
              <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              Day 1: Kickoff & Hacking
            </h3>
            <ul className="space-y-6">
              {[
                { time: "09:00 AM - 09:30", title: "Opening Ceremony", desc: "Welcome address from TMA leadership, rules, judging criteria overview, problem statement" },
                { time: "9:30 AM – 10:30 AM", title: "Team Formation / Idea Pitches", desc: "Teams assemble or pitch ideas." },
                { time: "10:30 AM – 12:30 PM", title: "Hacking: Problem Solving 1", desc: "Work session begins" },
                { time: "12:30 PM – 1:30 PM", title: "Lunch Break", desc: "Refuel and connect." },
                { time: "1:30 PM – 2:30 PM", title: "Problem Solving + Mentorship", desc: "Initial business models development" },
                { time: "2:30 PM – 2:45 PM", title: "Snack Break", desc: "Light refreshments" },
                { time: "2:45 PM – 3:30 PM", title: "Progress Check-ins", desc: "Quick team check-ins" },
                { time: "3:30 PM – 4:00 PM", title: "First Draft Pitches", desc: "Share initial ideas/approaches" },
              ].map((item, index) => (
                <li key={index} className="border-l-2 border-purple-500 pl-4">
                  <div className="text-orange-400 font-mono text-sm">{item.time}</div>
                  <h4 className="font-bold text-lg text-white mt-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Day 2 */}
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-orange-900/50">
            <h3 className="text-2xl font-bold mb-6 text-orange-400 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Day 2: Execution & Pitch
            </h3>
            <ul className="space-y-6">
              {[
                { time: "9:00 AM – 9:30 AM", title: "Breakfast & Recap", desc: "Day 1 insights, fuel-up and adjustments" },
                { time: "9:30 AM – 11:00 PM", title: "Final Hacking Push", desc: "Wrap up development" },
                { time: "11:00 AM – 12:00 PM", title: "Mentor Check-ins / Mini Quiz?", desc: "Optional quiz or game for engagement" },
                { time: "12:00 PM – 1:00 PM", title: "Lunch Break", desc: "Final break before showcase" },
                { time: "1:00 PM - 1:30", title: "Submission Deadline", desc: "Submit all code and documentation" },
                { time: "1:30 PM – 2:30 PM", title: "Team Presentations", desc: "5–10 minutes per team" },
                { time: "2:30 PM – 3:00 PM", title: "Judging Deliberation", desc: "Judges finalize scores" },
                { time: "3:00 PM – 4:00 PM", title: "🏆Awards Ceremony", desc: "Celebrate winners and participants" },
              ].map((item, index) => (
                <li key={index} className="border-l-2 border-orange-500 pl-4">
                  <div className="text-purple-400 font-mono text-sm">{item.time}</div>
                  <h4 className="font-bold text-lg text-white mt-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}