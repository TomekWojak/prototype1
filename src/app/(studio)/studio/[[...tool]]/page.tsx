import type { Metadata, Viewport } from "next";

import Studio from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Panel treści — Księga i Miecz",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <Studio />;
}
