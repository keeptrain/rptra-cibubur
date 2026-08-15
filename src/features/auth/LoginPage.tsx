import { Trees } from "lucide-react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

interface LoginPageProps {
  searchParams?: Promise<{
    step?: string;
    email?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const step = params?.step === "otp" ? "otp" : "email";
  const email = params?.email || "";

  return (
    <div className="w-full space-y-4">
      {/* HEADER SECTION (Rendered on Server) */}
      <div className="overflow-hidden rounded-2xl border-3 border-emerald-950 bg-white shadow-[8px_8px_0px_0px_#064e3b]">
        <div className="px-6 pt-8 pb-6 text-center sm:px-8">
          {/* Logo Circle */}
          <Link
            href={"/"}
            className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border-2 border-emerald-950 bg-emerald-600 text-white shadow-[3px_3px_0px_0px_#064e3b]"
          >
            <Trees className="size-7 text-[#A7F3D0]" />
          </Link>

          <h1 className="text-3xl font-black tracking-tight text-emerald-950 uppercase sm:text-4xl">
            MASUK
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed font-semibold text-emerald-900/80 sm:text-sm">
            Masukkan email Anda, kami kirimkan kode OTP. Belum punya akun pun
            tidak masalah — akunya dibuat otomatis.
          </p>
        </div>

        {/* CLIENT FORM COMPONENT */}
        <LoginForm initialStep={step} initialEmail={email} />
      </div>
    </div>
  );
}
