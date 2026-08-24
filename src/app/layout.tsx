import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Playfair Display — szeryfowy krój tytułowy, odpowiednik eleganckiej
   typografii z plakatu. `latin-ext` jest konieczny dla ą/ć/ę/ł/ń/ś/ź/ż. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/* Inter — tekst bieżący. Wysoka czytelność przy małych stopniach pisma. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Festiwal Księga i Miecz — Wen & Wu | Rzeszów 24–25.10.2026",
    template: "%s | Księga i Miecz",
  },
  description:
    "Festiwal Kultury Chińskiej „Księga i Miecz” — Wen & Wu. Rzeszów, 24–25 października 2026, Sala Sportowa SP nr 18. Smocze i lwie tańce, pokazy sztuk walki, ceremonia parzenia herbaty, warsztaty kaligrafii. Wstęp wolny.",
  keywords: [
    "festiwal kultury chińskiej",
    "Księga i Miecz",
    "Wen i Wu",
    "taijiquan",
    "wushu",
    "Rzeszów",
    "taniec smoka",
    "taniec lwa",
    "kaligrafia chińska",
    "ceremonia herbaty",
  ],
  authors: [{ name: "Fundacja Chen Taijiquan Rzeszów" }],
  openGraph: {
    title: "Festiwal Księga i Miecz — Wen & Wu | Rzeszów 2026",
    description:
      "Dwa dni chińskiej kultury w Rzeszowie: księga i miecz, umysł i ciało. 24–25 października 2026. Wstęp wolny.",
    locale: "pl_PL",
    type: "website",
    siteName: "Festiwal Księga i Miecz",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5e100e",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
