import React from 'react';

export default function Prizes() {
  return (
    <section id="prizes" className="relative min-h-[60vh] py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
              The Ultimate Reward Awaits
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-orange-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One exceptional team will claim victory - and the spoils that come with it
          </p>
        </div>

        {/* Prize Reveal Animation */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-purple-500/30 p-12 text-center">
            <div className="animate-pulse">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-orange-600 rounded-full mb-6 mx-auto">
                <span className="text-4xl">?</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Top Secret Prizes</h3>
              <p className="text-purple-300">To be revealed at the finale</p>
            </div>
          </div>
        </div>

        {/* What's At Stake */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              What's On The Line
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: "🏆",
                title: "Glory", 
                desc: "Eternal bragging rights as champions" 
              },
              { 
                icon: "💎",
                title: "Rewards", 
                desc: "Valuable prizes worth competing for" 
              },
              { 
                icon: "🚀",
                title: "Opportunity", 
                desc: "A chance to stand out from the crowd" 
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-900/70 p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all text-center"
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h4 className="font-bold text-lg text-white">{item.title}</h4>
                <p className="text-gray-400 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Teaser */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-orange-600 text-white px-6 py-3 rounded-lg mb-6">
            <span className="font-bold">The only question is...</span>
          </div>
          <h3 className="text-3xl font-bold text-white">
            Will <span className="text-purple-400">your</span> team be the one to claim it?
          </h3>
        </div>
      </div>
    </section>
  );
}