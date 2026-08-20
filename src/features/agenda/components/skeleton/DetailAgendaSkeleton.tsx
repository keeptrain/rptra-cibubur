interface DetailAgendaSkeletonProps {
  isRounded?: boolean;
}

/**
 * Loading Skeleton for Detail Agenda page.
 * Supports isRounded prop: renders rounded-xl for public view, and sharp corners for admin view.
 */
export default function DetailAgendaSkeleton({
  isRounded = false,
}: DetailAgendaSkeletonProps) {
  return (
    <div
      className={`animate-pulse border border-zinc-200 bg-white p-6 text-left shadow-2xs sm:p-8 ${
        isRounded ? "rounded-xl" : ""
      }`}
    >
      <div className="space-y-6">
        {/* HEADER SKELETON */}
        <div className="space-y-3 border-b border-zinc-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <div className="h-6 w-36 rounded-md bg-zinc-200" />
              <div className="h-6 w-28 rounded-md bg-zinc-200" />
            </div>
            <div className="h-6 w-24 rounded-full bg-zinc-200" />
          </div>
          <div className="h-8 w-3/4 rounded-md bg-zinc-200" />
        </div>

        {/* META GRID SKELETON */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 sm:grid-cols-2">
          <div className="h-12 rounded-lg bg-zinc-200" />
          <div className="h-12 rounded-lg bg-zinc-200" />
          <div className="h-12 rounded-lg bg-zinc-200" />
          <div className="h-12 rounded-lg bg-zinc-200" />
        </div>

        {/* DESCRIPTION SKELETON */}
        <div className="space-y-2">
          <div className="h-4 w-40 rounded-md bg-zinc-200" />
          <div className="h-28 w-full rounded-xl border border-zinc-200 bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}
