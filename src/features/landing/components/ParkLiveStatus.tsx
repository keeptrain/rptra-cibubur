"use client";

import { useState, useEffect } from "react";

export default function ParkLiveStatus() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  const closeNotice = "Sedang ada acara";

  // Dynamic repetition calculation based on text length so short text fills screen width continuously
  const repeatCount = Math.max(8, Math.ceil(180 / (closeNotice.length || 1)));
  const noticeItems = Array.from({ length: repeatCount }, () => closeNotice);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      // RPTRA Cibubur open hours: 06:00 - 18:00 WIB
      setIsOpen(hours >= 6 && hours < 18);

      const timeString = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTimeStr(`${timeString} WIB`);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-t border-emerald-200/70 bg-white/90 text-xs text-emerald-950">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-8">
        {/* Only Live Status Indicator with Pulsing Dot */}
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            {isOpen && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex size-2.5 rounded-full ${
                isOpen ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
          </span>
          <span className="font-extrabold tracking-wide text-emerald-950 uppercase">
            {isOpen ? "Taman Beroperasi Hari Ini" : "Taman Tutup Hari Ini"}
          </span>
        </div>

        {/* Operational Details without extra icons */}
        <div className="flex flex-wrap items-center gap-4 font-semibold text-emerald-900/90">
          <span>
            Jam Buka:{" "}
            <strong className="font-bold text-emerald-950">
              06:00 - 18:00 WIB
            </strong>
          </span>
          <span className="hidden h-3 w-px bg-emerald-200 sm:block" />
          <span>
            Cuaca:{" "}
            <strong className="font-bold text-emerald-950">
              Cerah Berawan
            </strong>
          </span>
          <span className="hidden h-3 w-px bg-emerald-200 md:block" />
          <span className="font-bold text-emerald-800/80">
            {currentTimeStr}
          </span>
        </div>
      </div>

      {/* Dynamic Running Text Marquee Alasan Tutup */}
      {!isOpen && (
        <div className="w-full overflow-hidden py-4 text-xs font-semibold text-emerald-900">
          <div className="animate-marquee flex w-max space-x-6 whitespace-nowrap">
            {noticeItems.map((notice, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span>{notice}</span>
                <span className="text-emerald-300">•</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
