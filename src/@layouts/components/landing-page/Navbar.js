"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);

  // Smooth scroll detection with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 30);

          // Auto-detect active section
          const sections = ['home', 'services', 'faq', 'contact'];
          const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (current) setActiveLink(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      return () => nav.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Enhanced easing functions
  const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const navLinks = [
    { href: "/", label: "Home", id: "home" },
    { href: "/blog", label: "Blog", id: "blog" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#faq", label: "FAQ", id: "faq" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Backdrop blur overlay when scrolled */}
      <div
        className={`fixed inset-x-0 top-0 h-20 backdrop-blur-xl transition-all duration-1000 ease-out z-30 ${
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <nav
        ref={navRef}
        className={`fixed left-1/2 transform -translate-x-1/2 z-40 transition-all duration-700 ease-out ${
          scrolled
            ? "top-3 w-[95%] max-w-6xl bg-white/90 backdrop-blur-2xl shadow-2xl shadow-black/10 border border-white/20 rounded-2xl"
            : "top-0 w-full bg-white/95 backdrop-blur-sm"
        }`}
        style={{
          background: scrolled
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.95), rgba(255,255,255,0.8))`
            : undefined
        }}
      >
        <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center relative">

          {/* Animated gradient orb that follows mouse */}
          {scrolled && (
            <div
              className="absolute w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl transition-all duration-500 ease-out pointer-events-none"
              style={{
                left: mousePosition.x - 64,
                top: mousePosition.y - 64,
                opacity: 0.6,
              }}
            />
          )}

          {/* Logo with enhanced hover effect */}
          <Link href="/" className="relative z-10 group">
            <div className="relative overflow-hidden rounded-xl p-2 transition-all duration-500 ease-out group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-blue-50">
              <Image
                src="/img/finsova.png"
                alt="Finsova Logo"
                width={140}
                height={45}
                className="h-auto w-auto transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-lg"
                priority
              />
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-xl transition-all duration-500 ease-out" />
            </div>
          </Link>

          {/* Desktop Menu with floating indicator */}
          <div className="hidden md:flex space-x-3 relative">
            {/* Floating active indicator */}
            <div className="absolute inset-0 pointer-events-none">
              {navLinks.map((link, index) => (
                activeLink === link.id && (
                  <div
                    key={link.id}
                    className="absolute bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out opacity-90 shadow-lg shadow-purple-500/25"
                    style={{
                      left: `${index * 20}%`,
                      width: `${100 / navLinks.length}%`,
                      height: '40px',
                      transform: 'translateY(1px)',

                    }}
                  />
                )
              ))}
            </div>

            {navLinks.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setActiveLink(link.id)}
                className="relative px-6 py-2 text-sm lg:text-base font-medium transition-all duration-500 ease-out group z-10"
              >
                <span className={`transition-all duration-500 ease-out ${
                  activeLink === link.id
                    ? "text-white drop-shadow-sm"
                    : "text-gray-700 group-hover:text-purple-600"
                }`}>
                  {link.label}
                </span>

                {/* Individual hover effects */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-90 group-hover:scale-100" /> */}

                {/* Ripple effect on click */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 scale-0 group-active:opacity-30 group-active:scale-110 transition-all duration-200 ease-out" />
              </Link>
            ))}
          </div>

          {/* Enhanced Mobile Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-white/20 shadow-lg transition-all duration-500 ease-out hover:shadow-xl hover:scale-110 active:scale-95 group z-10"
            onClick={() => setOpen(!open)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out" />

            <div className="relative flex flex-col justify-center items-center w-full h-full">
              <div className={`w-5 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out ${
                open ? "rotate-45 translate-y-0.5" : "translate-y-0"
              }`} />
              <div className={`w-5 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out my-1 ${
                open ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`} />
              <div className={`w-5 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out ${
                open ? "-rotate-45 -translate-y-0.5" : "translate-y-0"
              }`} />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-700 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-transparent to-white/50 backdrop-blur-sm border-t border-white/20">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.id);
                    setOpen(false);
                  }}
                  className="block group relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: open ? "slideInFromRight 0.6s ease-out forwards" : "none"
                  }}
                >
                  <div className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-blue-50 group-hover:shadow-md">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                      activeLink === link.id
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
                        : "bg-gray-300 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400"
                    }`} />
                    <span className={`text-base font-medium transition-all duration-300 ease-out ${
                      activeLink === link.id
                        ? "text-purple-600 font-semibold"
                        : "text-gray-700 group-hover:text-purple-600"
                    }`}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
