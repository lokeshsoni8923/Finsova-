import React, { useState, useEffect, useRef } from "react";

const PhonePeStackedCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeCategory, setActiveCategory] = useState("individual");
  const [showProgressIndicator, setShowProgressIndicator] = useState(false);
  const sectionRef = useRef(null);

  const services = {
    individual: [
      {
        title: "Utility Bill Payments",
        desc: (
          <div>
            Pay bills instantly
            <p>
              Pay utility bills, mobile recharges, & credit card dues anytime,
              safely via your local Finkeda merchant.
            </p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            💡
          </div>
        ),
      },
      {
        title: "Travel Booking",
        desc: (
          <div>
            Flights, hotels, buses
            <p>Book flights, hotels, and buses at your nearest store instantly.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            ✈️
          </div>
        ),
      },
      {
        title: "Insurance",
        desc: (
          <div>
            Life, health, motor
            <p>
              Get covered instantly with life, health, travel & motor insurance
              without moving out of your locality.
            </p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            🛡️
          </div>
        ),
      },
      {
        title: "Investments",
        desc: (
          <div>
            Mutual funds, NCDs
            <p>
              Grow your wealth with safe investment options via trusted channels.
            </p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            📈
          </div>
        ),
      },
      {
        title: "FASTag",
        desc: (
          <div>
            Recharge and manage FASTag
            <p>Get new FastTags, recharge existing ones & breeze through tolls.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            🚗
          </div>
        ),
      },
    ],
    business: [
      {
        title: "Money Transfer (DMT)",
        desc: (
          <div>
            Fast & secure transfers
            <p>Facilitate secure fund transfers across India for your customers.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            💸
          </div>
        ),
      },
      {
        title: "Micro ATM",
        desc: (
          <div>
            Cash show & withdrawal
            <p>Provide cash withdrawals, deposits, and fund transfers from your shop.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            🏧
          </div>
        ),
      },
      {
        title: "AePS",
        desc: (
          <div>
            Aadhar-based banking
            <p>Let customers withdraw cash or check balances using Aadhaar.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            🏦
          </div>
        ),
      },
      {
        title: "BBPS",
        desc: (
          <div>
            Utility bill collection
            <p>Collect all types of utility bills from one place securely.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            📄
          </div>
        ),
      },
      {
        title: "PAN Services",
        desc: (
          <div>
            Quick PAN issuance
            <p>Register or update PAN cards quickly for your walk-in customers.</p>
          </div>
        ),
        icon: (
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
            🆔
          </div>
        ),
      },
    ],
  };

  const cards = services[activeCategory];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const inView = rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.7;
      setShowProgressIndicator(inView);

      let progress = 0;
      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        progress = Math.abs(rect.top) / (sectionRef.current.offsetHeight - windowHeight);
      } else if (rect.bottom < windowHeight) {
        progress = 1;
      }

      progress = Math.max(0, Math.min(1, progress));
      const cardIndex = Math.min(Math.floor(progress * cards.length), cards.length - 1);
      setActiveCard(cardIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="text-center text-5xl font-bold py-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Our Services
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveCategory("individual")}
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
            activeCategory === "individual"
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
          }`}
        >
          Individual Services
        </button>
        <button
          onClick={() => setActiveCategory("business")}
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${
            activeCategory === "business"
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
          }`}
        >
          Business Services
        </button>
      </div>

      {/* Cards Section */}
      <div ref={sectionRef} className="relative" style={{ height: `${(cards.length + 1) * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center justify-center p-6 pt-16 overflow-hidden">
          <div className="relative w-full h-[85%] max-w-6xl">
            {cards.map((card, index) => (
              <div
                key={`${activeCategory}-${index}`}
                className={`absolute inset-0 bg-white/90 rounded-3xl shadow-2xl transition-all duration-700 ease-out
                  ${index === activeCard ? "opacity-100 translate-y-0 scale-100 z-30" : ""}
                  ${index < activeCard ? "opacity-50 -translate-y-10 scale-95 z-20" : ""}
                  ${index > activeCard ? "opacity-0 translate-y-20 scale-100 z-10" : ""}`}
                style={{
                  transform: `translate3d(0,0,0)`,
                  willChange: "transform, opacity",
                }}
              >
                <div className="h-full flex items-center justify-between p-8 md:p-12">
                  <div className="flex-1 max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 leading-tight">
                      {card.title}
                    </h2>
                    <div className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 transition-all duration-500">
                      {card.desc}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-1/3 transition-transform duration-500">
                    <div className="transform hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        {showProgressIndicator && (
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500">
            <div className="bg-white/80 rounded-full p-3 shadow-lg">
              <div className="flex flex-col space-y-3">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-10 rounded-full transition-all duration-500 ease-out ${
                      index <= activeCard
                        ? "bg-gradient-to-b from-purple-500 to-blue-600 shadow-md"
                        : "bg-gray-300"
                    }`}
                    style={{
                      transform: index === activeCard ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhonePeStackedCards;
