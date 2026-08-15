export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-slate-900 via-emerald-950 to-zinc-950 p-4">
      {children}
    </main>
  );
}
