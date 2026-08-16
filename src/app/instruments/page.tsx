import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function InstrumentsPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select("*");

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-emerald-950">
      <div className="space-y-6">
        <div className="space-y-2 border-b border-emerald-200 pb-4">
          <h1 className="text-3xl font-black tracking-tight uppercase sm:text-4xl">
            INSTRUMENTS TABLE
          </h1>
          <p className="text-xs font-semibold text-emerald-800/80">
            Daftar instrumen dari database Supabase PostgreSQL.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-xs font-bold text-rose-700">
            Error fetching instruments: {error.message}
          </div>
        )}

        {instruments && instruments.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-xs">
            <ul className="divide-y divide-emerald-100">
              {instruments.map((item: any, idx: number) => (
                <li
                  key={item.id || idx}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-emerald-50/50"
                >
                  <span className="text-sm font-bold text-emerald-950">
                    {item.name || JSON.stringify(item)}
                  </span>
                  {item.id && (
                    <span className="font-mono text-xs text-emerald-700">
                      ID: {item.id}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-8 text-center text-xs font-bold text-emerald-800">
            Belum ada data instrumen. Silakan jalankan SQL pembuatan tabel
            `instruments` di Supabase Dashboard.
          </div>
        )}
      </div>
    </main>
  );
}
