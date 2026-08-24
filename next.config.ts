import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    /* Bez tego Turbopack szuka korzenia projektu w górę drzewa katalogów
       i trafia na package-lock.json w katalogu domowym użytkownika
       (projekt leży w OneDrive, poza repozytorium git). Przypinamy korzeń
       do katalogu aplikacji. */
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
