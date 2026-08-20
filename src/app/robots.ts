import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rptra-cibubur.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/manajemen-agenda/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
