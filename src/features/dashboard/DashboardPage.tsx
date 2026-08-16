"use client";

import { useRouter } from "next/navigation";

interface DashboardPageProps {
  userEmail: string;
}

export default function DashboardPage({ userEmail }: DashboardPageProps) {
  const router = useRouter();

  return <main className="flex-1 bg-emerald-50 py-8 sm:py-12"></main>;
}
