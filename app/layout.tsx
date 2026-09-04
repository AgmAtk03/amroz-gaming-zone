import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amroz Gaming Zone | PS club in Kathmandu Ward 32",
  description:
    "Amroz Gaming Zone is a PlayStation club and PC hangout in Ward 32, Kathmandu. Book PS5 booths, join tournaments, and grab weekly or monthly memberships in NPR.",
  applicationName: "Amroz Gaming Zone",
  keywords: [
    "Amroz Gaming Zone",
    "Kathmandu PS5",
    "gaming zone Ward 32",
    "PlayStation club Nepal",
  ],
  openGraph: {
    title: "Amroz Gaming Zone",
    description:
      "Ward 32’s late-night PS club — booths, tournaments, memberships in NPR.",
    locale: "en_NP",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="site-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
