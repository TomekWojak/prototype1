import type { Metadata, Viewport } from "next";
import { Lato, Tinos } from "next/font/google";
import "./globals.css";

/* Tinos — nagłówki. Metrycznie zgodny z Times New Roman, którego używa
   chen.rzeszow.pl. Spokojny szeryf bez „projektanckiego” charakteru:
   Playfair, którego było tu wcześniej, czytał się jako krój z szablonu. */
const tinos = Tinos({
  variable: "--font-tinos",
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/* Lato — dokładnie ten sam krój tekstowy co na stronie stowarzyszenia,
   żeby obie witryny czytały się jako jedna rodzina. */
const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${tinos.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink-soft">
        {children}
      </body>
    </html>
  );
}
