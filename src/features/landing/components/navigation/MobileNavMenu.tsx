"use client";

import { useState } from "react";
import { Menu, X, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLinkItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MobileNavMenuProps {
  navLinks: NavLinkItem[];
}

export default function MobileNavMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Hamburger Toggle Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        size="icon-lg"
      >
        {isOpen ? <X className="size-7" /> : <Menu className="size-7" />}
      </Button>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute inset-x-0 top-20 space-y-3 border-b border-emerald-100 bg-white/95 px-4 pt-3 pb-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/95">
          {children}
        </div>
      )}
    </div>
  );
}
