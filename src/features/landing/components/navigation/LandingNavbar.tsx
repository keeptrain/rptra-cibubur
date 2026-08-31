import Link from "next/link";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import RptraIcon from "@/components/shared/RptraIcon";
import { LANDING_NAV_LINKS } from "../../constants/navigations";
import MobileNavMenu from "./MobileNavMenu";
import LandingNavLink from "./LandingNavLink";
import { Button } from "@/components/ui/button";

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
          <nav className="hidden items-center gap-2 rounded-xl border px-2 py-0.5 md:flex">
            <SharedNavigations />
          </nav>

          {/* Desktop Status & CTA Button */}
          <div className="hidden items-center gap-3 md:flex">
            <LoginButton />
          </div>

          {/* Isolated Client Component for Mobile Navigation */}
          <MobileNavMenu>
            <nav className="flex flex-col items-start gap-2">
              <SharedNavigations />
            </nav>
            {user ? (
              <Button asChild className="w-full md:w-fit">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <LoginButton />
            )}
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

export function LoginButton() {
  return (
    <Button asChild size="lg" className="w-full md:w-fit">
      <Link href="/login">Login</Link>
    </Button>
  );
}
