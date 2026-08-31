import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rptra-cibubur.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "RPTRA Cibubur Berseri - Portal Resmi Kegiatan Warga & Fasilitas Taman",
    template: "%s | RPTRA Cibubur",
  },
  description:
    "Portal resmi RPTRA Cibubur (RPTRA Cibubur Berseri) Kelurahan Cibubur, Kecamatan Ciracas, Jakarta Timur. Informasi agenda kegiatan warga, posyandu, jadwal operasional taman, dan pendaftaran kunjungan fasilitas.",
  icons: {
    icon: "/fav.svg",
  },
  keywords: [
    "RPTRA Cibubur",
    "RPTRA Cibubur Berseri",
    "RPTRA Kelurahan Cibubur",
    "Ruang Publik Terpadu Ramah Anak Cibubur",
    "Agenda RPTRA Cibubur",
    "Jadwal Kegiatan RPTRA Cibubur",
    "Posyandu RPTRA Cibubur",
    "Fasilitas RPTRA Cibubur",
    "RPTRA Ciracas Jakarta Timur",
    "Taman Cibubur",
    "Pendaftaran Kunjungan RPTRA",
  ],
  authors: [{ name: "Pengelola RPTRA Cibubur" }],
  creator: "Pengelola RPTRA Cibubur",
  publisher: "Pemerintah Provinsi DKI Jakarta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: "RPTRA Cibubur Berseri - Portal Resmi Kegiatan & Fasilitas Taman",
    description:
      "Informasi resmi agenda kegiatan, posyandu, fasilitas taman, dan jadwal operasional RPTRA Kelurahan Cibubur, Jakarta Timur.",
    siteName: "RPTRA Cibubur",
    images: [
      {
        url: "/images/rptra-cibubur.webp",
        width: 1200,
        height: 630,
        alt: "RPTRA Cibubur Berseri Jakarta Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RPTRA Cibubur Berseri - Portal Resmi Kegiatan Warga",
    description:
      "Informasi resmi agenda kegiatan, posyandu, dan pendaftaran kunjungan RPTRA Kelurahan Cibubur, Jakarta Timur.",
    images: ["/images/rptra-cibubur.webp"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Google Official Recognition
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CivicStructure",
    name: "RPTRA Cibubur Berseri",
    alternateName: ["RPTRA Cibubur", "Ruang Publik Terpadu Ramah Anak Cibubur"],
    description:
      "Ruang Publik Terpadu Ramah Anak (RPTRA) Kelurahan Cibubur, Kecamatan Ciracas, Jakarta Timur. Tempat kegiatan kemasyarakatan, taman bermain anak, posyandu, dan olahraga warga.",
    url: siteUrl,
    image: `${siteUrl}/images/rptra-cibubur.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Lapangan Tembak No. 1, Cibubur",
      addressLocality: "Ciracas",
      addressRegion: "Jakarta Timur",
      postalCode: "13720",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.335,
      longitude: 106.885,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        "light",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
      style={{ colorScheme: "light" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
