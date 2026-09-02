"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const SITEKEY = "0x4AAAAAAEkT-ke7pGUNqUSw";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
      getResponse: (id?: string) => string;
    };
  }
}

interface TurnstileWidgetProps {
  action: string;
  resetKey?: string | number;
  hidden?: boolean;
}

export default function TurnstileWidget({
  action,
  resetKey,
  hidden = false,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let iv: NodeJS.Timeout | null = null;

    const render = () => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current)
        return;
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITEKEY,
          action,
          theme: "light",
          appearance: hidden ? "interaction-only" : "always",
          size: "flexible",
        });
      } catch {}
    };

    if (window.turnstile) {
      render();
    } else {
      iv = setInterval(() => {
        if (window.turnstile) {
          if (iv) clearInterval(iv);
          if (!cancelled) render();
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (iv) clearInterval(iv);

      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [action, hidden]);

  useEffect(() => {
    if (resetKey === undefined || !widgetIdRef.current || !window.turnstile)
      return;
    try {
      window.turnstile.reset(widgetIdRef.current);
    } catch {}
  }, [resetKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div ref={containerRef} className="w-full" />
    </>
  );
}
