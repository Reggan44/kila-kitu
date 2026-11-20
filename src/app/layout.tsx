import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kilakitutech.co.ke"),
  title: "Kila Kitu Technologies | Digital Solutions Studio — Nairobi, Kenya",
  description:
    "Everything engineered to scale. Kila Kitu Technologies is an established digital solutions studio in Nairobi engineering high-converting web platforms, custom ERPs, and automated M-Pesa business systems.",
  keywords: [
    "Kila Kitu Technologies",
    "Kila Kitu Tech",
    "software development Kenya",
    "web agency Nairobi",
    "digital solutions studio Kenya",
    "M-Pesa integration",
    "Daraja API developers",
    "custom ERP Kenya",
    "e-commerce web development Nairobi",
    "Next.js agency Kenya",
  ],
  authors: [{ name: "Kila Kitu Technologies" }],
  creator: "Kila Kitu Technologies",
  publisher: "Kila Kitu Technologies",
  icons: {
    icon: [
      { url: "/logo-mark.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-mark.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo-mark.png",
    apple: "/logo-mark.png",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://kilakitutech.co.ke",
    title: "Kila Kitu Technologies | Digital Solutions Studio",
    description:
      "One roof. Zero finger-pointing. We engineer websites that bring qualified leads, custom systems that plug revenue leaks, and automated workflows that eliminate paperwork.",
    siteName: "Kila Kitu Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kila Kitu Technologies | Everything Digital. Built to Scale.",
    description:
      "Outgrow the manual. Build systems that scale. High-speed web platforms, custom ERPs, and automated M-Pesa systems.",
  },
  alternates: {
    canonical: "https://kilakitutech.co.ke",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kila Kitu Technologies",
    "alternateName": "Kila Kitu Tech",
    "url": "https://kilakitutech.co.ke",
    "logo": "https://kilakitutech.co.ke/icon.svg",
    "description":
      "Digital solutions studio in Nairobi, Kenya engineering high-converting web platforms, custom business systems, retail point-of-sale, and native Daraja M-Pesa automated workflows.",
    "telephone": "+254700000000",
    "email": "kilakitutechnologies@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "KE",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.286389,
      "longitude": 36.817223,
    },
    "priceRange": "KES 35,000 - 350,000+",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
