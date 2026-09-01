import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ClipboardList,
  History,
  User,
  LogOut,
  CircleStarIcon,
  ConstructionIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardUserSection() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Clock className="size-4" /> Kunjungan Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">3x</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="size-4" /> Agenda Diikuti
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">5</CardContent>
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
              <p className="text-sm font-semibold text-zinc-700">
                Segera Hadir
              </p>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                Coming Soon
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button
          asChild
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <Link href="/rencana-kunjungan">
            <ClipboardList className="size-5" /> Daftar Kunjungan
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <Link href="/agenda">
            <Calendar className="size-5" /> Lihat Agenda
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <Link href="/dashboard/riwayat">
            <History className="size-5" /> Riwayat Saya
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <Link href="/dashboard/profil">
            <User className="size-5" /> Profil
          </Link>
        </Button>
      </div>

      {/* Agenda Terdekat */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="size-4" /> Agenda Terdekat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-xl border p-4">
            <p className="font-medium">Senam Ceria</p>
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              <Clock className="size-3.5" /> 01 Sep 08:00 •{" "}
              <MapPin className="size-3.5" /> Aula Utama
            </p>
            <Button asChild size="sm" className="mt-3">
              <Link href="/agenda">Lihat Detail</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Riwayat Kunjungan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="size-4" /> Riwayat Kunjungan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>28 Agu — 10:00 — 4 orang</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
              Disetujui
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border px-3 py-2">
            <span>15 Agu — 08:00 — 2 orang</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs">
              Selesai
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
