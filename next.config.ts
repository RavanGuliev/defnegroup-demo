import type { NextConfig } from "next";
import { legacyUrlMap } from "./src/lib/legacy-urls";

// Paneldən yüklənən şəkillər Laravel API serverindən gəlir (storage/…)
const api = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const apiOrigin = api ? new URL(api) : null;
const isLocalApi = !!apiOrigin && /^(localhost|127\.|10\.|192\.168\.)/.test(apiOrigin.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: apiOrigin
      ? [{ protocol: apiOrigin.protocol.replace(":", "") as "http" | "https", hostname: apiOrigin.hostname, port: apiOrigin.port, pathname: "/storage/**" }]
      : [],
    // Yalnız lokal inkişafda (API 127.0.0.1-dədirsə) şəkil optimallaşdırması üçün
    dangerouslyAllowLocalIP: isLocalApi,
  },
  // Köhnə demo ünvanları yeni 17/107 quruluşuna daimi yönləndirilir
  async redirects() {
    return [
      // Sayt əvvəl TR + AZ idi; AZ versiyası İngilis dili ilə əvəzləndi → köhnə /az ünvanları /en-ə
      { source: "/az", destination: "/en", permanent: true },
      { source: "/az/:path*", destination: "/en/:path*", permanent: true },
      ...legacyUrlMap().map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
