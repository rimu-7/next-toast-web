import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = "https://toast.rimubhai.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
