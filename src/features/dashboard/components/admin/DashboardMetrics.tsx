import Link from "next/link";
import {
  CalendarCheck,
  CalendarDays,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardMetrics() {
  const metrics = [
    {
      title: "Kunjungan",
      count: "0",
      icon: CalendarCheck,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200/60",
      href: "/dashboard/kunjungan",
    },
    {
      title: "Agenda",
      count: "0",
      icon: CalendarDays,
      iconBg: "bg-sky-50 text-sky-600 border border-sky-200/60",
      href: "/dashboard/agenda",
    },
    {
      title: "Warga",
      count: "1",
      icon: UserCheck,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
      href: "/dashboard/warga",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.title}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white px-4 sm:px-6 py-4 text-left shadow-xs transition-all hover:border-slate-300 hover:shadow-md sm:rounded-2xl"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-8 items-center justify-center rounded-lg sm:size-9 ${metric.iconBg}`}
                >
                  <Icon className="size-4" />
                </div>
                <Link
                  href={metric.href}
                  className="text-slate-400 transition-colors hover:text-slate-700"
                >
                  <ArrowUpRight className="size-3.5 sm:size-4" />
                </Link>
              </div>

              <div className="flex items-end gap-2">
                <span className="block text-lg font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {metric.count}
                </span>
                <h4 className="truncate text-[10px] font-semibold text-slate-600 sm:text-xs">
                  {metric.title}
                </h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
