export function normalizeImageUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `http://192.168.0.19:3001${url}`;
}
