export type NavIconName = "calendar" | "clipboard";

export interface NavLinkItem {
  name: string;
  href: string;
  iconName: NavIconName;
}

export const LANDING_NAV_LINKS: NavLinkItem[] = [
  {
    name: "Agenda",
    href: "/agenda",
    iconName: "calendar",
  },
  {
    name: "Kunjungan",
    href: "/rencana-kunjungan",
    iconName: "clipboard",
  },
];
