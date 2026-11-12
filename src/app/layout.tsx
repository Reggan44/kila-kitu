import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kila Kitu Tech | End-to-End Software, Web Platforms & Smart Systems",
  description:
    "Kila Kitu Tech builds digital infrastructure for African businesses — from custom software and web platforms to IoT-enabled smart systems that power growth across the continent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
