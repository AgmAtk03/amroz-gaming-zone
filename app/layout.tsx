import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amroz Gaming Zone | Fast top-ups & same-day gear, Pepsicola",
  description:
    "Kathmandu gaming service: instant digital top-ups, same-day physical gear within two hours. Pickup at Pepsicola Ward 32.",
  applicationName: "Amroz Gaming Zone",
  keywords: [
    "Amroz Gaming Zone",
    "Kathmandu top-up",
    "Free Fire Nepal",
    "Pepsicola gaming shop",
  ],
  openGraph: {
    title: "Amroz Gaming Zone",
    description: "Instant digital. Same-day physical from Pepsicola Ward 32.",
    locale: "en_NP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="site-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
