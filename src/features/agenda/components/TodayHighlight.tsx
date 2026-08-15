import { Clock, MapPin, User, Bell, ArrowRight } from "lucide-react";
import { AgendaItem } from "../constants/agendas";

interface TodayHighlightProps {
  agenda: AgendaItem;
}

export default function TodayHighlight({ agenda }: TodayHighlightProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-950 p-6 text-white shadow-lg sm:p-8">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-72 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative z-10 space-y-5">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/40 bg-lime-400/20 px-3.5 py-1 text-xs font-extrabold tracking-wider text-lime-300 uppercase backdrop-blur-md">
            <span className="size-2 rounded-full bg-lime-400 animate-pulse" />
            HARI INI • {agenda.dayName.toUpperCase()}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-md">
            {agenda.categoryLabel}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {agenda.title}
          </h2>
          <p className="mt-2 max-w-3xl text-xs font-medium leading-relaxed text-emerald-100/90 sm:text-base">
            {agenda.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-white backdrop-blur-md sm:grid-cols-3 sm:text-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-lime-400/20 text-lime-300">
              <Clock className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-emerald-200/70">Waktu</span>
              <span className="font-bold">{agenda.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-lime-400/20 text-lime-300">
              <MapPin className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-emerald-200/70">Lokasi</span>
              <span className="font-bold">{agenda.location}</span>
            </div>
          </div>

          {agenda.instructor && (
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-lime-400/20 text-lime-300">
                <User className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase text-emerald-200/70">Pendamping / Narsum</span>
                <span className="font-bold">{agenda.instructor}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <span className="text-xs font-semibold text-lime-300">
            🎯 Sasaran: <strong className="text-white">{agenda.targetAudience}</strong>
          </span>

          <a
            href={`https://wa.me/6281234567890?text=Halo%20Pengelola%20RPTRA,%20saya%20ingin%20tanya%20mengenai%20${encodeURIComponent(agenda.title)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2.5 text-xs font-extrabold uppercase text-emerald-950 shadow-md transition-all hover:scale-105 hover:bg-lime-300"
          >
            <Bell className="size-4" />
            Pengingat WhatsApp
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
