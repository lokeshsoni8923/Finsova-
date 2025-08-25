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
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-40 rounded-[50px] bg-[#fff] transition-all duration-300 border-[1px] border-[#C3EAF3] ${
        scrolled
          ? "bg-white  w-[85%] mt-0 py-0"
          : "bg-white  w-[90%] mt-9 py-1"
      }`}
    >
      <div className="max-w-full mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
      <Image
        src="/img/finsova.png"
        alt="Finsova Logo"
        width={150}
        height={100}
        priority
      />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <Link href="#services" className="hover:text-blue-600">Services</Link>
          <Link href="#faq" className="hover:text-blue-600">FAQ</Link>
          <Link href="#contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 shadow-inner rounded-b-2xl">
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
