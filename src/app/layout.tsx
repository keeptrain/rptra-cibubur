import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LandingNavbar from "@/features/landing/components/LandingNavbar";
import LandingFooter from "@/features/landing/components/LandingFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RPTRA Cibubur",
  description: "Rumah Pintar Terpadu dan Ruang Publik Terpadu Anak Cibubur",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LandingNavbar />
        {children}
        <LandingFooter />
      </body>
    </html>
  );
}
