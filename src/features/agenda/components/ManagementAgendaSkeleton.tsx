export default function ManagementAgendaSkeleton() {
  return (
    <div className="space-y-6 text-left">
      {/* METRICS GRID SKELETON (3 COLUMNS) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between border border-slate-200 bg-white p-3.5 shadow-2xs sm:p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="size-9 animate-pulse bg-slate-200 sm:size-10" />
              <div className="size-3.5 animate-pulse bg-slate-200" />
            </div>
            <div className="h-6 w-16 animate-pulse bg-slate-200" />
          </div>
        ))}
      </div>

      {/* LIST SECTION SKELETON */}
      <div className="space-y-4 border border-slate-200 bg-white p-5 shadow-2xs">
        {/* HEADER ROW SKELETON */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-2">
            <div className="h-4 w-44 animate-pulse bg-slate-200" />
            <div className="h-3 w-60 animate-pulse bg-slate-200" />
          </div>
          <div className="h-9 w-32 animate-pulse bg-slate-200" />
        </div>

        {/* TABS & SEARCH SKELETON */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-8 w-64 animate-pulse bg-slate-200" />
          <div className="h-8 w-36 animate-pulse bg-slate-200" />
        </div>
        <div className="h-9 w-full animate-pulse bg-slate-200" />

        {/* ITEM CARDS SKELETON */}
        <div className="space-y-3 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="space-y-2.5 border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-20 animate-pulse bg-slate-200" />
                <div className="h-4 w-28 animate-pulse bg-slate-200" />
              </div>
              <div className="h-5 w-3/4 animate-pulse bg-slate-200" />
              <div className="h-4 w-1/2 animate-pulse bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
