"use client";

import { useState } from "react";
import { Trees, Calendar, Menu, X, PhoneCall } from "lucide-react";

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Zona Taman", href: "#zona-taman", icon: Trees },
    { name: "Agenda Warga", href: "#agenda", icon: Calendar },
  ];

  return (
    <header className="sticky bg-lime-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Brand */}
          <a href="#">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500">
              <Trees className="size-6 text-white" />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 rounded-full border border-emerald-100/60 bg-emerald-50/70 p-1.5 md:flex dark:border-zinc-700/50 dark:bg-zinc-800/50">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-white hover:text-emerald-600 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                >
                  <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Status & CTA Button */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#lokasi"
              className="flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-600/35 active:translate-y-0"
            >
              Masuk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800 transition-colors hover:bg-emerald-100 dark:bg-zinc-800 dark:text-emerald-300 dark:hover:bg-zinc-700"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="space-y-3 border-b border-emerald-100 bg-white/95 px-4 pt-2 pb-6 shadow-xl md:hidden dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
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
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-emerald-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  {link.name}
                </a>
              );
            })}
          </div>
          <a
            href="#lokasi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 py-3 font-bold text-white shadow-md shadow-emerald-600/20"
          >
            <PhoneCall className="h-5 w-5" />
            Kontak Pengelola
          </a>
        </div>
      )}
    </header>
  );
}
