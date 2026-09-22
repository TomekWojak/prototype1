import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  redirects() {
    return [
      /* Adres nadany przez Vercela serwowałby drugą, indeksowalną kopię strony
         pod inną nazwą. Kieruje na domenę właściwą; `permanent: false` daje 307,
         którego przeglądarki nie zapamiętują na stałe. */
      {
        source: "/:path*",
        has: [{ type: "host", value: "prototype1-x951.vercel.app" }],
        destination: "https://ksiegaimiecz.chen.pl/:path*",
        permanent: false,
      },
      { source: "/panel", destination: "/studio", permanent: false },
      {
        source: "/panel/:path*",
        destination: "/studio/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
