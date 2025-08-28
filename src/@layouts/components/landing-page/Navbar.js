"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 pt-3 transform -translate-x-1/2 z-40 transition-all duration-300
      ${scrolled ? "lg:w-[98%] w-[98%] shadow-md bg-white transition-all duration-500" : "bg-white w-full"}
      sm:w-[99%] lg:w-[100%]`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/img/finsova.png"
            alt="Finsova Logo"
            width={120}
            height={40}
            className="h-auto sm:h-auto md:h-[6vh] w-auto hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-10 text-sm lg:text-base text-blue-600 justify-center items-center">
          <Link href="/" className="transition-transform duration-300 hover:scale-110 hover:text-red-500">Home</Link>
          <Link href="/blog" className="transition-transform duration-300 hover:scale-110 hover:text-red-500">Blog</Link>
          <Link href="#services" className="transition-transform duration-300 hover:scale-110 hover:text-red-500">Services</Link>
          <Link href="#faq" className="transition-transform duration-300 hover:scale-110 hover:text-red-500">FAQ</Link>
          <Link href="#contact" className="transition-transform duration-300 hover:scale-110 hover:text-red-500">Contact</Link>
             </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-2xl bg-transparent text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-inner rounded-b-2xl text-sm">
          <Link href="/" className="block hover:text-blue-600">Home</Link>
          <Link href="/blog" className="block hover:text-blue-600">Blog</Link>
          <Link href="#services" className="block hover:text-blue-600">Services</Link>
          <Link href="#faq" className="block hover:text-blue-600">FAQ</Link>
          <Link href="#contact" className="block hover:text-blue-600">Contact</Link>

        </div>
      )}
    </nav>
  );
}
