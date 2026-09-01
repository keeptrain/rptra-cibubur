import { Skeleton } from "@/components/ui/skeleton";

export function ParkLiveStatusSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="w-full border-t border-zinc-200/70 bg-white/90 px-6 py-2 sm:px-8">
        <div className="flex items-center gap-3">
          <Skeleton className="size-2.5 rounded-full" />
          <Skeleton className="h-3.5 w-64" />
        </div>
      </div>
      <div className="w-full border-zinc-200/70 bg-white/90 px-6 py-1 sm:px-8">
        <Skeleton className="h-3.5 w-full" />
      </div>
    </div>
  );
}

export function AgendaTerdekatSkeleton() {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-5 w-32 bg-white/20" />
        <Skeleton className="h-4 w-48 bg-white/20" />
      </div>
      <Skeleton className="h-9 w-32 rounded-full bg-white/20" />
    </div>
  );
}

export function KegiatanTerakhirSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
