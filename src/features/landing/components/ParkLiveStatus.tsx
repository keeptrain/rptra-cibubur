interface ParkLiveStatusProps {
  isOpen?: boolean;
  closeNotice?: string;
}

export default function ParkLiveStatus({
  isOpen,
  closeNotice = "Sedang ada acara mendadak, harap menunggu",
}: ParkLiveStatusProps) {
  // Determine open/closed status (server-side calculation or prop override)
  const isParkOpen =
    isOpen ??
    (() => {
      const now = new Date();
      const hours = now.getHours();
      // RPTRA Cibubur open hours: 06:00 - 18:00 WIB
      return hours >= 6 && hours < 18;
    })();

  // Dynamic repetition calculation based on text length
  const repeatCount = Math.max(8, Math.ceil(180 / (closeNotice.length || 1)));
  const noticeItems = Array.from({ length: repeatCount }, () => closeNotice);

  return (
    <div className="w-full border-t border-emerald-200/70 bg-white/90 text-xs text-emerald-950">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-8">
        {/* Operational Details + Status Indicator directly AFTER Jam Buka */}
        {/* Status Indicator (Taman Beroperasi / Tutup) placed right after Jam Buka */}
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            {isParkOpen && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex size-2.5 rounded-full ${
                isParkOpen ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
          </span>
          <span className="font-extrabold tracking-wide text-emerald-950">
            {isParkOpen ? "Taman Beroperasi Hari Ini" : "Taman Tutup Hari Ini"}{" "}
            <strong className="font-bold text-emerald-950">
              ( 06:00 - 18:00 WIB )
            </strong>
          </span>
        </div>
      </div>

      {/* Dynamic Running Text Marquee Alasan Tutup */}
      {!isParkOpen && (
        <div className="w-full overflow-hidden p-2 text-xs font-semibold text-emerald-900 sm:p-0 md:py-4">
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
