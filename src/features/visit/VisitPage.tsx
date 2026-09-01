import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import VisitForm from "./components/VisitForm";
import { InfoIcon } from "lucide-react";

export default function VisitPage() {
  return (
    <main className="flex-1 bg-zinc-50 pt-10 pb-16">
      <div className="mx-auto h-full max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <Alert className="max-w-full border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <InfoIcon />
          <AlertTitle>
            Tidak perlu login untuk mengisi formulir kunjungan
          </AlertTitle>
          <AlertDescription>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Pastikan email @gmail.com benar dan valid agar riwayat pengajuan
                tercatat di sistem kami.
              </li>
              <li>Pastikan nomor WhatsApp benar untuk konfirmasi kunjungan.</li>
              <li>
                Isi tujuan / catatan selengkap mungkin sesuai kebutuhan
                kunjungan.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Main Visit Form */}
        <VisitForm />
      </div>
    </main>
  );
}
