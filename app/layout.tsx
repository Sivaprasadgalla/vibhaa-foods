import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 800",
});

const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-serif",
  display: "swap",
  weight: "500 700",
});

export const metadata: Metadata = {
  title: "Vibhaa Foods | Honest Andhra Flavours",
  description:
    "Traditional Andhra pickles, podis, sweets, and snacks handmade in thoughtful small batches.",
  keywords: [
    "Andhra pickles",
    "homemade podi",
    "Indian sweets",
    "traditional snacks",
    "Vibhaa Foods",
  ],
  openGraph: {
    title: "Vibhaa Foods | Honest Andhra Flavours",
    description:
      "Small-batch Andhra foods, made from family recipes and ingredients we trust.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
