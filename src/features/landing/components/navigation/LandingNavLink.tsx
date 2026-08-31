"use client";

import { CalendarIcon, ClipboardListIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkItem } from "../../constants/navigations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LandingNavLinkProps {
  link: NavLinkItem;
}

export default function LandingNavLink({ link }: LandingNavLinkProps) {
  const { name, href, iconName } = link;
  const pathname = usePathname();
  const Icon = iconName === "calendar" ? CalendarIcon : ClipboardListIcon;

  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      size="default"
      className={cn(
        "max-sm:w-full",
        isActive &&
          "max-sm:border-input max-sm:bg-background max-sm:text-foreground max-sm:hover:bg-accent max-sm:hover:text-accent-foreground max-sm:border",
      )}
    >
      <Link href={href}>
        <Icon className="size-4" />
        {name}
      </Link>
    </Button>
  );
}
