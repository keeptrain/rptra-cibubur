import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CircleStarIcon, ConstructionIcon } from "lucide-react";

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <CalendarIcon className="size-4" /> Kegiatan Diikuti
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">0</CardContent>
      </Card>
      <Card aria-disabled className="bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <CircleStarIcon className="size-4" /> Poin Partisipasi
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-row items-center gap-3 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <ConstructionIcon className="size-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-700">Segera Hadir</p>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold tracking-widest text-amber-600 uppercase">
              Coming Soon
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
