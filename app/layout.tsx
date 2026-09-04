import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amroz Gaming Zone | Pepsicola, Kathmandu",
  description:
    "PlayStation club and counter shop in Pepsicola. Booths, Fantech pickup, and digital top-ups same-day / within 2 hours in Kathmandu.",
  applicationName: "Amroz Gaming Zone",
  keywords: [
    "Amroz Gaming Zone",
    "Pepsicola PS5",
    "Kathmandu gaming zone",
    "PlayStation club Nepal",
  ],
  openGraph: {
    title: "Amroz Gaming Zone",
    description:
      "Pepsicola PlayStation club — booths, Fantech, digital top-ups.",
    locale: "en_NP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="site-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
