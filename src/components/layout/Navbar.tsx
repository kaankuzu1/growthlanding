"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { CALENDLY_URL } from "@/lib/constants";
import type { NavDict } from "@/types";

export default function Navbar({ dict, locale }: { dict: NavDict; locale: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-bright/60 backdrop-blur-xl shadow-[0_0_40px_-5px_rgba(224,141,255,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-full">
        {/* Logo */}
        <a href={`/${locale}`} className="text-2xl font-black tracking-tighter text-white uppercase font-headline">
          Audience Labs
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {dict.links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-headline font-bold uppercase tracking-tighter transition-all duration-200 hover:scale-105 ${
                i === 0
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA + Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="grainy-gradient-primary text-on-primary px-6 py-2 font-headline font-bold uppercase tracking-tighter hover:scale-105 transition-transform duration-200 active:scale-95"
          >
            {dict.bookACall}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-zinc-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container-low/95 backdrop-blur-xl">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {dict.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-headline font-bold uppercase tracking-tighter text-zinc-400 hover:text-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <LanguageSwitcher locale={locale} />
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="grainy-gradient-primary text-on-primary px-6 py-3 font-headline font-bold uppercase tracking-tighter text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              {dict.bookACall}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
