import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/constants";
import { BASE_URL } from "@/lib/canonical";

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryEntries = CATEGORIES.map((category) => ({
    url: `${BASE_URL}/#${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}
