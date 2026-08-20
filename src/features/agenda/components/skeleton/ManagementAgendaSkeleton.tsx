/**
 * Initial Suspense skeleton loader for Management Agenda Page.
 * Matches exact 4-column metric grid and list container layout.
 */
export default function ManagementAgendaSkeleton() {
  return (
    <div className="space-y-4">
      {/* 4-COLUMN METRICS CARDS GRID SKELETON */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between border border-slate-200 bg-white p-3 text-left shadow-2xs sm:p-4"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
              <div className="size-9 shrink-0 animate-pulse bg-slate-100 sm:size-10" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="h-5 w-8 animate-pulse bg-slate-200" />
                <div className="h-3 w-20 animate-pulse bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH BAR & MONTH/YEAR SELECTORS SKELETON */}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-9 flex-1 animate-pulse bg-slate-100" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 animate-pulse bg-slate-100" />
          <div className="h-9 w-20 animate-pulse bg-slate-100" />
        </div>
      </div>

      {/* LIST ITEMS CARDS SKELETON */}
      <div className="space-y-2.5 pt-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 border border-slate-200 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1 space-y-2 text-left">
              <div className="flex items-center gap-2">
                <div className="h-5 w-24 animate-pulse bg-slate-200" />
                <div className="h-4 w-28 animate-pulse bg-slate-100" />
              </div>
              <div className="h-5 w-3/4 animate-pulse bg-slate-200 sm:w-2/3" />
              <div className="flex flex-wrap items-center gap-3 pt-0.5">
                <div className="h-3.5 w-28 animate-pulse bg-slate-100" />
                <div className="h-3.5 w-32 animate-pulse bg-slate-100" />
                <div className="h-3.5 w-24 animate-pulse bg-slate-100" />
              </div>
            </div>
            <div className="h-8 w-20 shrink-0 animate-pulse bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
