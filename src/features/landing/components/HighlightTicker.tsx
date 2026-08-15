import { CigaretteOff, LeafyGreenIcon, Wifi } from "lucide-react";

const highlights = [
  { text: "KAWASAN  BEBAS ASAP ROKOK", icon: CigaretteOff },
  { text: "WIFI GRATIS UNTUK WARGA", icon: Wifi },
  { text: "LINGKUNGAN HIJAU & ASRI", icon: LeafyGreenIcon },
];

const REPEATED_HIGHLIGHTS = [...highlights, ...highlights, ...highlights];

export default function HighlightTicker() {
  return (
    <div className="w-full overflow-hidden border-y-2 border-emerald-200/80 bg-lime-300 py-4">
      <div className="animate-marquee flex w-max space-x-8 whitespace-nowrap">
        {REPEATED_HIGHLIGHTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-black tracking-widest uppercase"
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
