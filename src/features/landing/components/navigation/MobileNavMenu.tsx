"use client";

import { useState } from "react";
import { Menu, X, LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavLinkItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MobileNavMenuProps {
  navLinks: NavLinkItem[];
}

export default function MobileNavMenu({ navLinks }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800 transition-colors hover:bg-emerald-100 dark:bg-zinc-800 dark:text-emerald-300 dark:hover:bg-zinc-700"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute inset-x-0 top-20 space-y-3 border-b border-emerald-100 bg-white/95 px-4 pt-3 pb-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            Taman Beroperasi Hari Ini (06:00 - 18:00 WIB)
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-emerald-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 py-3 font-bold text-white shadow-md shadow-emerald-600/20"
          >
            Masuk
          </Link>
        </div>
      )}
    </div>
  );
}
