import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
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
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: "Kila Kitu Technologies | Software, Web & Hardware Engineering — Nairobi",
  description:
    "Kila Kitu Technologies in Nairobi builds websites, e-commerce and business software, M-Pesa integrations, PCB designs, firmware, IoT devices, and connected hardware.",
  keywords: [
    "Kila Kitu Technologies",
    "Kila Kitu Tech",
    "software development Kenya",
    "web agency Nairobi",
    "hardware engineering Kenya",
    "PCB design Nairobi",
    "firmware development Kenya",
    "IoT solutions Kenya",
    "connected product engineering",
    "electronics prototyping Nairobi",
    "M-Pesa integration",
    "Daraja API developers",
    "custom ERP Kenya",
    "e-commerce web development Nairobi",
    "Next.js agency Kenya",
  ],
  authors: [{ name: "Kila Kitu Technologies" }],
  creator: "Kila Kitu Technologies",
  publisher: "Kila Kitu Technologies",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
    title: "Kila Kitu Technologies | Software, Web & Hardware Engineering",
    description:
      "One team for websites, business software, M-Pesa integrations, PCB design, firmware, IoT devices, and connected hardware.",
    siteName: "Kila Kitu Technologies",
    images: [
      {
        url: "/logo.png",
        width: 2000,
        height: 2000,
        alt: "Kila Kitu Technologies — digital solutions studio in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kila Kitu Technologies | Software, Web & Hardware",
    description:
      "Websites, business software, payments, PCB design, firmware, IoT, and physical prototypes engineered in Nairobi.",
    images: ["/logo.png"],
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
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo-mark.png`,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        areaServed: {
          "@type": "Country",
          name: "Kenya",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-KE",
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        description:
          "Technology engineering studio in Nairobi, Kenya building websites, e-commerce platforms, business systems, M-Pesa integrations, PCB designs, firmware, IoT devices, and physical prototypes.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        parentOrganization: {
          "@id": `${siteConfig.url}/#organization`,
        },
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
