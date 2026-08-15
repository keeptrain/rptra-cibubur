export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#F4FBF7]">
      {/* Background Emerald Dot Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#059669_1.2px,transparent_1.2px)] bg-size-[24px_24px] opacity-15" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </main>
  );
}
