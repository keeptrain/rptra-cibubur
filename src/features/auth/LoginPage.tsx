import LoginForm from "./components/LoginForm";
import Link from "next/link";
import RptraIcon from "@/components/shared/RptraIcon";

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="overflow-hidden border border-zinc-200 bg-white shadow-2xs sm:rounded-2xl">
        <div className="space-y-4 px-6 pt-8 pb-6 text-center sm:px-8">
          {/* Logo */}
          <Link href={"/"} className="mx-auto flex w-fit justify-center">
            <RptraIcon />
          </Link>
          <h1 className="text-1xl font-medium tracking-tight sm:text-2xl">
            Masuk
          </h1>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-zinc-600">
            Masukkan email Anda, kami kirimkan kode OTP. Belum punya akun pun
            tidak masalah — akunya dibuat otomatis.
          </p>
        </div>

        {/* CLIENT FORM COMPONENT */}
        <LoginForm />
      </div>
    </div>
  );
}
