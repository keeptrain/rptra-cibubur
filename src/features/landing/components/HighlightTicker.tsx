import { CigaretteOff, LeafyGreenIcon, Wifi } from "lucide-react";

const highlights = [
  { text: "KAWASAN BEBAS ASAP ROKOK", icon: CigaretteOff },
  { text: "WIFI GRATIS UNTUK WARGA", icon: Wifi },
  { text: "LINGKUNGAN HIJAU & ASRI", icon: LeafyGreenIcon },
];

const REPEATED_HIGHLIGHTS = [...highlights, ...highlights, ...highlights];

export default function HighlightTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-emerald-300/80 bg-[#A7F3D0] py-3.5 text-emerald-950">
      <div className="flex w-max space-x-8 whitespace-nowrap">
        {REPEATED_HIGHLIGHTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase"
            >
              <Icon className="size-4 shrink-0 text-emerald-900" />
              <span className="text-[8px] sm:text-[10px]">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
