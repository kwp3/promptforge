export const BASE_URL = "https://promptforge-teal.vercel.app";

export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.replace(/\/$/, "").replace(/\/+/g, "/");
  return `${BASE_URL}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
}
