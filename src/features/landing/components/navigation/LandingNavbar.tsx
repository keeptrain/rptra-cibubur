import Link from "next/link";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import RptraIcon from "@/components/shared/RptraIcon";
import { LANDING_NAV_LINKS } from "../../constants/navigations";
import { Button } from "@/components/ui/button";
import LandingNavLink from "./LandingNavLink";
import { TextAlignJustifyIcon } from "lucide-react";

export default async function LandingNavbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-25 bg-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <RptraIcon className="size-10" />
          </Link>

          {/* Desktop Navigation Links (Server Rendered Next.js Links) */}
          <nav className="hidden items-center gap-2 rounded-xl border p-1.5 md:flex">
            {LANDING_NAV_LINKS.map((link) => (
              <LandingNavLink key={link.name} link={link} />
            ))}
          </nav>

          {/* Desktop Status & CTA Button */}
          <div className="hidden items-center gap-3 md:flex">
            <LoginButton />
          </div>

          {/* Isolated Client Component for Mobile Navigation */}
          <div>
            <Button variant="outline">
              <TextAlignJustifyIcon />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SharedNavigations() {
  return (
    <nav className="hidden items-center gap-2 rounded-xl border p-1.5 md:flex">
      {LANDING_NAV_LINKS.map((link) => (
        <LandingNavLink key={link.name} link={link} />
      ))}
    </nav>
  );
}

function LoginButton() {
  return (
    <Button asChild size="lg">
      <Link href="/login">Login</Link>
    </Button>
  );
}
