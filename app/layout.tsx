import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amroz Gaming Zone | Game top-ups in Kathmandu",
  description:
    "Free Fire, PUBG, MLBB, Valorant, Roblox, PS Store, and Steam Instant Delivery top-ups on your ID. 2 Hour Delivery gaming gear from Pepsicola, Ward 32.",
  applicationName: "Amroz Gaming Zone",
  keywords: [
    "Amroz Gaming Zone",
    "Kathmandu top-up",
    "Free Fire Nepal",
    "Pepsicola gaming shop",
  ],
  openGraph: {
    title: "Amroz Gaming Zone",
    description: "Instant Delivery top-ups on your ID. 2 Hour Delivery gaming gear in Kathmandu.",
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
      className={`${inter.variable} ${noto.variable} h-full antialiased`}
    >
      <body className={`${inter.className} site-bg flex min-h-full flex-col`}>{children}</body>
    </html>
  );
}
