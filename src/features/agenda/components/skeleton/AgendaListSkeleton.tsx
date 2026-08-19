/**
 * Reusable 3-row card skeleton loader for Agenda List.
 * Used when filter query states change or during initial suspense loading.
 */
export default function AgendaListSkeleton() {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-3 border border-slate-200 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex-1 space-y-2.5 text-left">
            {/* BADGE & DATE ROW */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 rounded-xs bg-slate-200" />
              <div className="h-4 w-28 rounded-xs bg-slate-100" />
            </div>

            {/* TITLE ROW */}
            <div className="h-5 w-3/4 rounded-xs bg-slate-200 sm:w-2/3" />

            {/* META INFO ROW */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <div className="h-3.5 w-28 rounded-xs bg-slate-100" />
              <div className="h-3.5 w-32 rounded-xs bg-slate-100" />
              <div className="h-3.5 w-24 rounded-xs bg-slate-100" />
            </div>
          </div>

          {/* ACTION BUTTON SKELETON */}
          <div className="h-8 w-20 shrink-0 rounded-xs bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
