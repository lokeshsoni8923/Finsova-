import React, { useState, useEffect, useRef } from 'react';

const CombinedBankingLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationTime, setAnimationTime] = useState(0);
  const blobRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
    setIsLoaded(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Continuous animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationTime(Date.now() * 0.001); // Convert to seconds

      // Animate particles with more complex movement
      particlesRef.current = particlesRef.current.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + Math.sin(Date.now() * 0.001 + particle.phase) * 0.1 + 100) % 100,
        y: (particle.y + particle.speedY + Math.cos(Date.now() * 0.001 + particle.phase) * 0.1 + 100) % 100,
        opacity: 0.2 + Math.abs(Math.sin(Date.now() * 0.002 + particle.phase)) * 0.6,
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate automatic blob movement
  const getAutomaticBlobTransform = () => {
    const time = animationTime;
    const autoX = Math.sin(time * 0.3) * 15 + Math.cos(time * 0.2) * 8;
    const autoY = Math.cos(time * 0.25) * 12 + Math.sin(time * 0.15) * 10;
    const autoRotation = Math.sin(time * 0.1) * 20;
    const autoScale = 1 + Math.sin(time * 0.4) * 0.1;
    const mouseInfluence = 0.3; // Reduce mouse influence to blend with auto movement

    return {
      x: autoX + mousePosition.x * mouseInfluence,
      y: autoY + mousePosition.y * mouseInfluence,
      rotation: autoRotation + mousePosition.x * 0.05,
      scale: autoScale,
    };
  };

  // Generate automatic blob border radius
  const getAutomaticBorderRadius = () => {
    const time = animationTime;
    const r1 = 60 + Math.sin(time * 0.7) * 25;
    const r2 = 40 + Math.cos(time * 0.9) * 20;
    const r3 = 70 + Math.sin(time * 0.6) * 30;
    const r4 = 30 + Math.cos(time * 0.8) * 25;

    return `${r1}% ${r2}% ${r3}% ${r4}%`;
  };

  // Generate automatic gradient position
  const getAutomaticGradientPosition = () => {
    const time = animationTime;
    const centerX = 50 + Math.sin(time * 0.4) * 20;
    const centerY = 50 + Math.cos(time * 0.3) * 20;

    return { x: centerX, y: centerY };
  };

  const slides = [
    {
      title: "Digital Banking Solution to Every Doorstep and Village",
      subtitle: "Smarter Banking for Everyone",
      background: "from-gray-50 to-white",
      textColor: "text-gray-900",
      subtitleColor: "text-gray-600"
    },
    {
      title: "Why Choose Finsova?",
      subtitle: "We provide seamless banking solutions for both individuals and businesses, with cutting-edge digital services designed for modern finance.",
      background: "from-purple-900 to-indigo-900",
      textColor: "text-white",
      subtitleColor: "text-gray-300"
    }
  ];

  const currentSlideData = slides[currentSlide];
  const blobTransform = getAutomaticBlobTransform();
  const borderRadius = getAutomaticBorderRadius();
  const gradientPos = getAutomaticGradientPosition();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSlideData.background} relative overflow-hidden transition-all duration-1000`}>

      {/* Enhanced Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${4 + Math.random() * 6}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 4}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          />
        ))}
      </div>

      {/* Animated Wave Background with automatic movement */}
      <div className="absolute bottom-0 w-full opacity-20">
        <svg className="w-full h-40" viewBox="0 0 1440 320">
          <path
            fill={currentSlide === 0 ? "#f97316" : "#8400ff"}
            fillOpacity="0.6"
            d="M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,224C672,213,768,139,864,117.3C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128V320H0Z"
            style={{
              animation: 'waveFlow 8s infinite ease-in-out',
            }}
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 lg:py-6">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
            style={{
              animation: 'logoFloat 3s infinite ease-in-out',
            }}
          >
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className={`text-xl font-semibold ${currentSlideData.textColor}`}>Finsova</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className={`${currentSlideData.textColor} hover:text-orange-500 transition-colors duration-300 font-medium opacity-80 hover:opacity-100`}>Product</a>
          <a href="#" className={`${currentSlideData.textColor} hover:text-orange-500 transition-colors duration-300 font-medium opacity-80 hover:opacity-100`}>About</a>
          <a href="#" className={`${currentSlideData.textColor} hover:text-orange-500 transition-colors duration-300 font-medium opacity-80 hover:opacity-100`}>News</a>
          <a href="#" className={`${currentSlideData.textColor} hover:text-orange-500 transition-colors duration-300 font-medium opacity-80 hover:opacity-100`}>Explore APIs</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className={`${currentSlideData.textColor} hover:text-orange-500 transition-colors duration-300 opacity-80 hover:opacity-100`}>En</button>
          <button className={`${currentSlideData.textColor} hover:text-orange-500 transition-colors duration-300 opacity-80 hover:opacity-100`}>عربي</button>
          <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Log in
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-12 lg:py-20 min-h-[80vh]">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-6">
            <h1
              className={`text-4xl lg:text-6xl font-light ${currentSlideData.textColor} leading-tight transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animation: isLoaded ? 'titleFloat 4s infinite ease-in-out' : 'none',
              }}
            >
              {currentSlideData.title}
            </h1>

            <p
              className={`text-lg lg:text-xl ${currentSlideData.subtitleColor} leading-relaxed transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {currentSlideData.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side - Enhanced 3D Blob Animation */}
        <div className="flex-1 relative flex justify-center items-center">
          <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">

            {/* Main Morphing Blob with automatic movement */}
            <div
              ref={blobRef}
              className="absolute inset-0 transition-all duration-100 ease-out"
              style={{
                background: currentSlide === 0 ? `
                  radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%,
                    #d97706 0%,
                    #ea580c 25%,
                    #dc2626 50%,
                    #991b1b 75%,
                    #7c2d12 100%
                  )
                ` : `
                  radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%,
                    #8b5cf6 0%,
                    #7c3aed 25%,
                    #6d28d9 50%,
                    #5b21b6 75%,
                    #4c1d95 100%
                  )
                `,
                borderRadius: borderRadius,
                transform: `
                  rotate(${blobTransform.rotation}deg)
                  scale(${blobTransform.scale})
                  translate(${blobTransform.x * 0.5}px, ${blobTransform.y * 0.3}px)
                `,
                filter: 'blur(1px)',
              }}
            />

            {/* Enhanced Particle System */}
            <div className="absolute inset-0 pointer-events-none">
              {particlesRef.current.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute rounded-full transition-all duration-100"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    opacity: particle.opacity * 0.8,
                    width: `${particle.size * 0.5}px`,
                    height: `${particle.size * 0.5}px`,
                    background: currentSlide === 0 ?
                      'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,165,0,0.6) 100%)' :
                      'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(139,92,246,0.6) 100%)',
                    transform: `scale(${0.8 + Math.sin(animationTime * 2 + particle.phase) * 0.4})`,
                  }}
                />
              ))}
            </div>

            {/* Enhanced Glowing Aura with automatic pulsing */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.3 + Math.sin(animationTime * 1.5) * 0.1,
                background: currentSlide === 0 ? `
                  radial-gradient(circle at center,
                    rgba(249, 115, 22, 0.4) 0%,
                    rgba(251, 146, 60, 0.3) 30%,
                    rgba(253, 186, 116, 0.2) 60%,
                    transparent 100%
                  )
                ` : `
                  radial-gradient(circle at center,
                    rgba(139, 92, 246, 0.4) 0%,
                    rgba(124, 58, 237, 0.3) 30%,
                    rgba(109, 40, 217, 0.2) 60%,
                    transparent 100%
                  )
                `,
                borderRadius: `
                  ${70 + Math.cos(animationTime * 0.8) * 25}%
                  ${50 + Math.sin(animationTime * 0.9) * 20}%
                  ${60 + Math.cos(animationTime * 0.7) * 30}%
                  ${40 + Math.sin(animationTime * 1.1) * 22}%
                `,
                transform: `
                  scale(${1.3 + Math.sin(animationTime * 0.5) * 0.2})
                  rotate(${animationTime * 10}deg)
                `,
                filter: 'blur(25px)',
              }}
            />

            {/* Secondary Morphing Layer with independent movement */}
            <div
              className="absolute inset-4"
              style={{
                opacity: 0.7 + Math.sin(animationTime * 1.2) * 0.1,
                background: currentSlide === 0 ? `
                  linear-gradient(${45 + Math.sin(animationTime * 0.6) * 30}deg,
                    #f97316 0%,
                    #ea580c 50%,
                    #c2410c 100%
                  )
                ` : `
                  linear-gradient(${45 + Math.sin(animationTime * 0.6) * 30}deg,
                    #8b5cf6 0%,
                    #7c3aed 50%,
                    #6d28d9 100%
                  )
                `,
                borderRadius: `
                  ${40 + Math.sin(animationTime * 1.1 + 1) * 18}%
                  ${60 + Math.cos(animationTime * 0.9 + 1) * 25}%
                  ${50 + Math.sin(animationTime * 0.8 + 1) * 22}%
                  ${70 + Math.cos(animationTime * 1.2 + 1) * 15}%
                `,
                transform: `
                  rotate(${-animationTime * 5}deg)
                  scale(${0.85 + Math.cos(animationTime * 0.7) * 0.1})
                `,
                filter: 'blur(0.5px)',
              }}
            />

            {/* Enhanced Shimmer Effect with automatic movement */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.4 + Math.sin(animationTime * 2) * 0.1,
                background: `
                  linear-gradient(
                    ${90 + Math.sin(animationTime * 0.8) * 60}deg,
                    transparent 20%,
                    rgba(255, 255, 255, 0.8) 50%,
                    transparent 80%
                  )
                `,
                borderRadius: 'inherit',
                animation: 'shimmerMove 3s infinite ease-in-out',
              }}
            />

            {/* Additional orbiting elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: currentSlide === 0 ?
                      'radial-gradient(circle, #fbbf24, #f59e0b)' :
                      'radial-gradient(circle, #a855f7, #8b5cf6)',
                    left: '50%',
                    top: '50%',
                    transform: `
                      translate(-50%, -50%)
                      rotate(${animationTime * (30 + i * 20)}deg)
                      translateX(${120 + i * 40}px)
                      scale(${0.8 + Math.sin(animationTime * 2 + i) * 0.4})
                    `,
                    opacity: 0.6 + Math.sin(animationTime * 1.5 + i) * 0.3,
                    filter: 'blur(1px)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? (currentSlide === 0 ? 'bg-orange-500' : 'bg-purple-500')
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            style={{
              animation: currentSlide === index ? 'dotPulse 2s infinite ease-in-out' : 'none',
            }}
          />
        ))}
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-15px) translateX(8px) rotate(90deg) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-8px) translateX(-5px) rotate(180deg) scale(0.9);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) translateX(12px) rotate(270deg) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes waveFlow {
          0%, 100% {
            transform: translateX(0) scaleY(1);
          }
          25% {
            transform: translateX(-10px) scaleY(1.1);
          }
          50% {
            transform: translateX(5px) scaleY(0.9);
          }
          75% {
            transform: translateX(-5px) scaleY(1.05);
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(5deg);
          }
        }

        @keyframes titleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes shimmerMove {
          0%, 100% {
            transform: translateX(-50%) skewX(-10deg);
            opacity: 0.3;
          }
          25% {
            transform: translateX(-25%) skewX(5deg);
            opacity: 0.6;
          }
          50% {
            transform: translateX(0%) skewX(-5deg);
            opacity: 0.8;
          }
          75% {
            transform: translateX(25%) skewX(10deg);
            opacity: 0.5;
          }
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 currentColor;
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 4px transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default CombinedBankingLanding;
