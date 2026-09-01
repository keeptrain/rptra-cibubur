import Link from "next/link";
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  ChevronRight,
  User,
  ShieldCheck,
} from "lucide-react";

interface MenuSectionProps {
  isAdmin: boolean;
  userEmail: string;
}

export default function MenuSection({ isAdmin, userEmail }: MenuSectionProps) {
  const navMenuItems = [
    {
      title: "Permohonan Kunjungan",
      description: "Pengajuan & riwayat permohonan kunjungan rombongan",
      href: "/rencana-kunjungan",
      icon: CalendarCheck,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200/60",
    },
    {
      title: "Agenda Kegiatan Warga",
      description: "Jadwal & kalender kegiatan publik RPTRA",
      href: "/manajemen-agenda",
      icon: CalendarDays,
      iconBg: "bg-sky-50 text-sky-600 border border-sky-200/60",
    },
    ...(isAdmin
      ? [
          {
            title: "Pengaturan Jam Operasional",
            description: "Atur jadwal 7-hari & pengumuman libur taman",
            href: "/jam-operasional",
            icon: Clock,
            iconBg:
              "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-5 text-left">
      {/* USER PROFILE CARD (Server Rendered) */}
      <div className="flex items-center justify-between border border-slate-200 bg-white p-4 shadow-xs sm:p-6">
        <div className="flex items-center gap-3.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <User className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {userEmail}
              </span>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  <ShieldCheck className="size-3" /> Admin
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MENU NAVIGATION LIST (Server Rendered) */}
      <div className="space-y-2.5">
        <span className="px-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
          MENU UTAMA
        </span>

        <div className="divide-y divide-slate-100 overflow-hidden border border-slate-200 bg-white shadow-xs">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/80 sm:p-5"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ChevronRight className="size-4 text-slate-400" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
