"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Menu } from "lucide-react";

export default function ProtectedBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Menu",
      href: "/menu",
      icon: Menu,
    },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/40 bg-white/40 backdrop-blur-xl transition-all duration-300 md:right-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:rounded-2xl md:border md:border-white/60 md:bg-white/40 md:p-2 md:shadow-2xl md:shadow-emerald-950/10 md:backdrop-blur-2xl">
      <div className="mx-auto flex max-w-xs items-center justify-around px-3 py-2 md:max-w-none md:justify-center md:gap-3 md:p-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href !== "#" &&
            (pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href)));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex min-h-11 min-w-18 flex-col items-center justify-center gap-1 rounded-2xl px-4 py-2 transition-all duration-200 md:min-h-10.5 md:min-w-0 md:flex-row md:gap-2.5 md:rounded-2xl md:px-6 md:py-2.5 ${
                isActive
                  ? "scale-105 border border-emerald-950/10 bg-white font-black text-emerald-950 shadow-xs"
                  : "font-extrabold text-emerald-950/70 hover:bg-white/50 hover:text-emerald-950"
              }`}
            >
              <Icon
                className={`size-5 transition-transform duration-200 ${
                  isActive ? "scale-110 text-emerald-950" : ""
                }`}
              />
              <span className="text-[11px] font-extrabold tracking-tight md:text-xs">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
