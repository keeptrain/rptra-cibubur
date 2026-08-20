import Link from "next/link";
import { Clock, MapPin, User, ArrowUpRight } from "lucide-react";
import { AgendaItem as PublicAgendaItem } from "../../constants/agendas";

interface EventCardProps {
  item: PublicAgendaItem;
}

export default function EventCard({ item }: EventCardProps) {
  return (
    <article
      className={`flex flex-col justify-between rounded-xl border bg-white p-4 shadow-2xs transition-all ${
        item.isOngoing
          ? "border-lime-500"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="space-y-2">
        {/* TOP ROW: TITLE LINK ON LEFT, ARROW BUTTON LINK ON RIGHT */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            <Link
              href={`/agenda/${item.id}`}
              className="transition-colors hover:text-emerald-700"
            >
              {item.title}
            </Link>
          </h3>

          <Link
            href={`/agenda/${item.id}`}
            aria-label={`Rincian agenda ${item.title}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-900 hover:text-white"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        {/* DESCRIPTION */}
        {item.description ? (
          <p className="line-clamp-2 text-xs leading-relaxed font-medium text-slate-600">
            {item.description}
          </p>
        ) : null}

        {/* MERGED TIME | LOCATION | ORGANIZER METADATA LINE */}
        <div className="flex flex-wrap items-center gap-x-2 pt-1 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5 shrink-0 text-slate-400" />
            {item.time}
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0 text-slate-400" />
            {item.location}
          </span>
          {item.instructor ? (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <User className="size-3.5 shrink-0 text-slate-400" />
                {item.instructor}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
