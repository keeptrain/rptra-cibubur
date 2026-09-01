import Link from "next/link";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import RptraIcon from "@/components/shared/RptraIcon";
import { LANDING_NAV_LINKS } from "../../constants/navigations";
import MobileNavMenu from "./MobileNavMenu";
import LandingNavLink from "./LandingNavLink";
import { Button } from "@/components/ui/button";

export default async function LandingNavbar() {
  const user = await getCurrentUser();
  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-15 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <RptraIcon />
          </Link>

          {/* Desktop Navigation Links (Server Rendered Next.js Links) */}
          <nav className="hidden items-center gap-2 rounded-xl border p-1 md:flex">
            <SharedNavigations />
          </nav>

          {/* Desktop Status & CTA Button */}
          <div className="hidden items-center gap-3 md:flex">
            <LoginOrDashboardButton isLoggedIn={isLoggedIn} />
          </div>

          {/* Isolated Client Component for Mobile Navigation */}
          <MobileNavMenu>
            <nav className="flex flex-col items-start gap-2">
              <SharedNavigations />
            </nav>
            <LoginOrDashboardButton isLoggedIn={isLoggedIn} />
          </MobileNavMenu>
        </div>
      </div>
    </header>
  );
}

function SharedNavigations() {
  return (
    <>
      {LANDING_NAV_LINKS.map((link) => (
        <LandingNavLink key={link.name} link={link} />
      ))}
    </>
  );
}

export function LoginOrDashboardButton({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  return isLoggedIn ? (
    <Button asChild size="lg" className="w-full md:w-fit">
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  ) : (
    <Button asChild size="lg" className="w-full md:w-fit">
      <Link href="/login">Login</Link>
    </Button>
  );
}
