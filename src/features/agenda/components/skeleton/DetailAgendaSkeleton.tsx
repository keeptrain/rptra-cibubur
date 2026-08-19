/**
 * High-level Big Picture Loading Skeleton for Detail Agenda page.
 * Used inside React Suspense fallback while async Server Component loads.
 */
export default function DetailAgendaSkeleton() {
  return (
    <div className="border border-slate-200 bg-white text-left shadow-2xs animate-pulse">
      {/* HERO BANNER SKELETON */}
      <div className="aspect-21/9 w-full bg-slate-200" />

      {/* BODY CONTENT SKELETON */}
      <div className="space-y-6 p-5">
        {/* TITLE & BADGES SKELETON */}
        <div className="space-y-3 border-b border-slate-100 pb-4">
          <div className="flex gap-2">
            <div className="h-6 w-32 rounded-xs bg-slate-200" />
            <div className="h-6 w-24 rounded-xs bg-slate-200" />
          </div>
          <div className="h-7 w-3/4 rounded-xs bg-slate-200" />
        </div>

        {/* META GRID SKELETON */}
        <div className="grid grid-cols-1 gap-4 border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          <div className="h-10 rounded-xs bg-slate-200" />
          <div className="h-10 rounded-xs bg-slate-200" />
          <div className="h-10 rounded-xs bg-slate-200" />
          <div className="h-10 rounded-xs bg-slate-200" />
        </div>

        {/* DESCRIPTION SKELETON */}
        <div className="space-y-2">
          <div className="h-4 w-40 rounded-xs bg-slate-200" />
          <div className="h-28 w-full border border-slate-200 bg-slate-100 rounded-xs" />
        </div>
      </div>
    </div>
  );
}
