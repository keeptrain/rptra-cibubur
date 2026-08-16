import { getLiveStatus } from "../api/getLiveStatus";

export default async function ParkLiveStatus() {
  const { isOpen, operatingHours, closeNotice } = await getLiveStatus();

  return (
    <div className="w-full border-t border-emerald-200/70 bg-white/90 text-xs text-emerald-950">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 sm:px-8">
        {/* Status Indicator (Taman Beroperasi / Tutup) */}
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
          <span className="font-extrabold tracking-wide text-emerald-950">
            {isOpen ? "Taman Beroperasi Hari Ini" : "Taman Tutup Hari Ini"}{" "}
            <strong className="font-bold text-emerald-950">
              ( {operatingHours} )
            </strong>
          </span>
        </div>
      </div>

      {/* Dynamic Running Text Marquee (Only for sudden/custom closure logs) */}
      {!isOpen && closeNotice.length > 0 && (
        <div className="w-full overflow-hidden p-2 text-xs font-semibold text-emerald-900 sm:p-0 md:py-4">
          <div className="animate-marquee flex w-max space-x-6 whitespace-nowrap">
            {closeNotice.map((notice, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <span>{notice}</span>
                <span>•</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
