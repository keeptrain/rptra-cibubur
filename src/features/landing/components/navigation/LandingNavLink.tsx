"use client";

import { CalendarIcon, ClipboardListIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkItem } from "../../constants/navigations";
import { Button } from "@/components/ui/button";

export default function LandingNavLink({ link }: { link: NavLinkItem }) {
  const { name, href, iconName } = link;
  const pathname = usePathname();
  const Icon = iconName === "calendar" ? CalendarIcon : ClipboardListIcon;

  const isActive = pathname === href;

  return (
    <Button asChild variant={isActive ? "default" : "ghost"} size="default">
      <Icon className="size-4" />
      <Link href={href}>{name}</Link>
    </Button>
  );
}
