"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { handleHashLinkClick } from "@/lib/scroll-utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/#about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Girja Enterprise Catalog"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleHashLinkClick(e, l.href)}
              className="text-sm text-slate-700 hover:text-orange-600 transition-colors duration-200 tracking-wide uppercase font-semibold"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(e) => handleHashLinkClick(e, "/#contact")}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 uppercase tracking-wide"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile menu btn */}
        <button className="md:hidden text-slate-800 p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-xl px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleHashLinkClick(e, l.href, () => setOpen(false))}
              className="text-slate-700 hover:text-orange-600 text-sm uppercase tracking-wide font-medium py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(e) => handleHashLinkClick(e, "/#contact", () => setOpen(false))}
            className="bg-orange-500 text-white text-center py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide shadow-sm"
          >
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
