"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Sun, Users } from "lucide-react";

export default function ParkLiveStatus() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

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
    <div className="w-full max-w-xs bg-white/85 p-4 backdrop-blur-md sm:p-5">
      {/* Live Operational Badge & Time */}
      <div className="flex items-center justify-between gap-3 pb-3">
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
          <span className="text-xs font-bold tracking-wide text-emerald-950 uppercase">
            {isOpen ? "Taman Beroperasi" : "Taman Tutup"}
          </span>
        </div>

        <span className="text-[11px] font-semibold text-emerald-800/70">
          {currentTimeStr}
        </span>
      </div>

      {/* Operational Details Grid */}
      <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-emerald-900">
        <div>
          <span className="block text-[10px] font-bold text-emerald-800/60 uppercase">
            Jam Buka
          </span>
          <span className="font-semibold text-emerald-950">06:00 - 18:00</span>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-emerald-800/60 uppercase">
            Cuaca Area
          </span>
          <span className="font-semibold text-emerald-950">Cerah Berawan</span>
        </div>
      </div>
    </div>
  );
}
