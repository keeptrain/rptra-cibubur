"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import DashboardMetrics from "./user/DashboardMetrics";

const DUMMY_AGENDAS = [
  {
    id: "1",
    title: "Senam Ceria Pagi",
    time: "01 Sep 08:00",
    location: "Aula Utama",
  },
  {
    id: "2",
    title: "Posyandu Balita & PMT",
    time: "02 Sep 09:00",
    location: "Ruang Kesehatan",
  },
  {
    id: "3",
    title: "Kelas Melukis Anak",
    time: "03 Sep 10:00",
    location: "Taman Bermain",
  },
  {
    id: "4",
    title: "Gotong Royong Warga",
    time: "04 Sep 07:00",
    location: "Lapangan",
  },
  {
    id: "5",
    title: "Penyuluhan Gizi",
    time: "05 Sep 08:30",
    location: "Aula Utama",
  },
  {
    id: "6",
    title: "Lomba Mewarnai",
    time: "06 Sep 09:00",
    location: "Pendopo",
  },
  {
    id: "7",
    title: "Senam Lansia",
    time: "07 Sep 07:30",
    location: "Halaman RPTRA",
  },
  {
    id: "8",
    title: "Pelatihan UMKM",
    time: "08 Sep 13:00",
    location: "Ruang Serbaguna",
  },
  {
    id: "9",
    title: "Pentas Seni Anak",
    time: "09 Sep 16:00",
    location: "Panggung Utama",
  },
  {
    id: "10",
    title: "Jumat Bersih",
    time: "10 Sep 08:00",
    location: "Seluruh Area",
  },
];

export default function DashboardUserSection() {
  const [limit, setLimit] = useState("3");
  const [page, setPage] = useState(0);
  const perPage = Number(limit);
  const totalPages = Math.ceil(DUMMY_AGENDAS.length / perPage);
  const start = page * perPage;
  const visible = DUMMY_AGENDAS.slice(start, start + perPage);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value);
    setPage(0);
  };

  return (
    <div className="space-y-6">
      <DashboardMetrics />

      {/* Agenda Terdekat — card di dalam card dengan filter justify-between */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Agenda Terdekat</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">Tampilkan</span>
            <NativeSelect
              value={limit}
              onChange={handleLimitChange}
              size="sm"
              className="w-20"
            >
              <NativeSelectOption value="3">3</NativeSelectOption>
              <NativeSelectOption value="10">10</NativeSelectOption>
            </NativeSelect>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {visible.map((item) => (
            <Card key={item.id} size="sm">
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex items-center gap-1 text-sm">
                <Clock className="size-3.5" /> {item.time} •{" "}
                <MapPin className="size-3.5" /> {item.location}
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Ikuti</Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/agenda/${item.id}`}>Lihat Detail</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            Hal {page + 1} dari {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Sebelum
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
