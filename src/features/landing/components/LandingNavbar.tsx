"use client";

import { useState } from "react";
import {
  Trees,
  Calendar,
  ShieldCheck,
  MapPin,
  Menu,
  X,
  PhoneCall,
} from "lucide-react";

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Zona Taman", href: "#zona-taman", icon: Trees },
    { name: "Agenda Warga", href: "#agenda", icon: Calendar },
    { name: "Tata Tertib", href: "#tata-tertib", icon: ShieldCheck },
    { name: "Lokasi & Rute", href: "#lokasi", icon: MapPin },
  ];

  return (
    <header className="sticky bg-lime-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Trees className="w-6 h-6" />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-emerald-50/70 dark:bg-zinc-800/50 p-1.5 rounded-full border border-emerald-100/60 dark:border-zinc-700/50">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-zinc-800 rounded-full transition-all duration-200"
                >
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Status & CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#lokasi"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Masuk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-zinc-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white/95 dark:bg-zinc-900/95 border-b border-emerald-100 dark:border-zinc-800 shadow-xl space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Taman Beroperasi Hari Ini (06:00 - 18:00 WIB)
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-100 hover:bg-emerald-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                >
                  <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  {link.name}
                </a>
              );
            })}
          </div>
          <a
            href="#lokasi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-600/20"
          >
            <PhoneCall className="w-5 h-5" />
            Kontak Pengelola
          </a>
        </div>
      )}
    </header>
  );
}
