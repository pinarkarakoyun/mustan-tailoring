import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Our root layout lives in app/[locale], so unmatched URLs need a
    // standalone 404 page (src/app/global-not-found.tsx).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Connects next-intl to src/i18n/request.ts (found automatically).
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
