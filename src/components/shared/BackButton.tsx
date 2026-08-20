"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable client back button using router.back() with fallback navigation.
 */
export default function BackButton({
  fallbackHref = "/agenda",
  className = "",
  children = "Kembali",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 ${className}`}
    >
      <ArrowLeft className="size-4" />
      {children}
    </button>
  );
}
