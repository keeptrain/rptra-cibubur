import { Trees, CalendarIcon, ClipboardListIcon } from "lucide-react";
import Link from "next/link";
import MobileNavMenu from "./MobileNavMenu";
import { getCurrentUser } from "@/features/auth/lib/getUser";

export default async function LandingNavbar() {
  const user = await getCurrentUser();

  const navLinks = [
    { name: "Agenda Warga", href: "/agenda", icon: CalendarIcon },
    {
      name: "Rencana Kunjungan",
      href: "/rencana-kunjungan",
      icon: ClipboardListIcon,
    },
  ];

  return (
    <header className="sticky top-0 z-25 bg-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500 shadow-sm transition-transform hover:scale-105">
              <Trees className="size-6 text-white" />
            </div>
          </Link>

          {/* Desktop Navigation Links (Server Rendered Next.js Links) */}
          <nav className="hidden items-center gap-1 rounded-2xl border border-emerald-100/60 bg-emerald-50/70 p-1.5 md:flex dark:border-zinc-700/50 dark:bg-zinc-800/50">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-white hover:text-emerald-600 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                >
                  <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Status & CTA Button */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={user ? "/dashboard" : "/login"}
              className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-600/35 active:translate-y-0"
            >
              {user ? "Dashboard" : "Masuk"}
            </Link>
          </div>

          {/* Isolated Client Component for Mobile Navigation */}
          {/* <MobileNavMenu navLinks={navLinks} /> */}
        </div>
      </div>
    </header>
  );
}
