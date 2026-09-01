"use client";

import { useState } from "react";
import { EqualIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileNavMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Hamburger Toggle Button with equal -> X transition */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        size="icon-lg"
      >
        <span className="relative flex size-7 items-center justify-center">
          <EqualIcon
            className={`absolute size-7 transition-all duration-300 ease-in-out ${
              isOpen
                ? "scale-0 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          />
          <XIcon
            className={`absolute size-7 transition-all duration-300 ease-in-out ${
              isOpen
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
            }`}
          />
        </span>
      </Button>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="absolute inset-x-0 top-20 space-y-3 border-b border-emerald-100 bg-white px-4 pt-3 pb-6 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}
