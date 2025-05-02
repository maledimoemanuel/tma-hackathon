import React from "react";
import { FaLinkedin } from "react-icons/fa"

const judges = [
  {
    name: "Steph",
    title: "TMA COO",
    img: "https://media.licdn.com/dms/image/v2/C4E03AQEzsqrYsoBbXA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1517251849137?e=2147483647&v=beta&t=yKf9FIv703d_wyhiAkjP-43PS3xs0Hi0kxvyjq22lDQ",
    bio: "Results-driven leader guiding TMA operations, with a track record of innovation and impact across roles from InternMatch to COO of Talentmatch Africa.",
    focus: "Operational Viability",
  },
  {
    name: "Kat",
    title: "TMA Facilitator",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQEYG0QL5Kk1kw/profile-displayphoto-shrink_400_400/B4DZRy0pdEGUAk-/0/1737093192634?e=1751500800&v=beta&t=hnmZX6bObSs2hrYSeaIfYMxzFJgCc49kY2ole3ZglfM",
    bio: "Career Readiness Facilitator | Project Coordinator | Helping Young Professionals Thrive",
    focus: "Market Potential",
    linkedin: "https://www.linkedin.com/in/katyasteynberg/"
  },
  {
    name: "Pre",
    title: "Hub Supervisor",
    img: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1746189052~exp=1746192652~hmac=a1829e23240fbb8a138b43e65adb39f6cd8f1c76c5986b36c2750d8f1ff2e30f&w=900",
    bio: "Skilled in managing collaborative environments and ensuring smooth operations. Focused on team cohesion, resource management, and delivering impactful outcomes.",
    focus: "Innovation & Scalability",
    linkedin: "https://www.linkedin.com/in/kgomotso-mahlare-2137b3124/",
  },
];

export default function Judges() {
  return (
    <section id="judges" className="relative min-h-[60vh] py-20 overflow-hidden">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              Our Judging Panel
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Industry leaders evaluating your business solutions
          </p>
        </div>

        {/* Judges Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {judges.map((judge, idx) => (
            <div 
              key={idx} 
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Judge Image */}
              <div className="relative pt-8 px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-orange-900/10 w-full h-full"></div>
                <img
                  src={judge.img}
                  alt={judge.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-purple-500/30 relative z-10"
                />
              </div>

              {/* Judge Info */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white">{judge.name}</h3>
                <p className="text-purple-400 font-medium mb-2">{judge.title}</p>
                <p className="text-gray-400 text-sm mb-4">{judge.bio}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Evaluation Focus</span>
                  <p className="text-orange-400 font-medium">{judge.focus}</p>
                </div>

                {/* Social Links*/}
                <div className="flex justify-center space-x-3 mt-6">
                  <a href={judge.linkedin} target="_blank" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <FaLinkedin/>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Judging Criteria */}
        <div className="mt-16 max-w-4xl mx-auto bg-gray-900/70 p-8 rounded-2xl border border-gray-800">
          <h3 className="text-2xl font-bold text-center mb-6 text-white">
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Evaluation Criteria
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { criteria: "Strength of your business idea and plan", weight: "40%" },
              { criteria: "Delivery of your presentation", weight: "30%" },
              { criteria: "Design and visual appeal", weight: "30%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  index === 0 ? "bg-purple-500/20 text-purple-400" :
                  index === 1 ? "bg-orange-500/20 text-orange-400" :
                  "bg-gray-800 text-gray-400"
                }`}>
                  <span className="font-bold">{item.weight}</span>
                </div>
                <div>
                  <h4 className="font-medium text-white">{item.criteria}</h4>
                  <p className="text-sm text-gray-400">Weight: {item.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}