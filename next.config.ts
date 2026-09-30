import type { NextConfig } from "next";
import { legacyUrlMap } from "./src/lib/legacy-urls";

const nextConfig: NextConfig = {
  // Köhnə demo ünvanları yeni 17/107 quruluşuna daimi yönləndirilir
  async redirects() {
    return legacyUrlMap().map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
