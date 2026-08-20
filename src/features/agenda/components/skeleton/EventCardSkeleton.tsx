/**
 * Skeleton loader for public agenda cards list during Suspense / useTransition updates.
 */
export default function EventCardSkeleton() {
  return (
    <div className="space-y-3 text-left">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col justify-between border border-slate-200 bg-white p-4 shadow-2xs"
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="h-5 w-44 animate-pulse bg-slate-200" />
              <div className="size-8 shrink-0 animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="h-4 w-3/4 animate-pulse bg-slate-100" />
            <div className="h-3.5 w-1/2 animate-pulse bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
