export const siteConfig = {
  name: "Kila Kitu Tech",
  legalName: "Kila Kitu Tech Solutions",
  tagline: "End-to-End Software, Web Platforms & Smart Systems",
  description:
    "We engineer high-converting web platforms, offline-first retail POS systems, and automated M-Pesa digital infrastructure for modern African enterprises.",
  domain: "kilakitutech.co.ke",
  url: "https://kilakitutech.co.ke",
  email: "kilakitutechnologies@gmail.com",
  phone: "+254 700 000 000",
  whatsappNumber: "254700000000",
  whatsappUrl: (message?: string) => {
    const text =
      message ||
      "Hi Kila Kitu Tech! I'm interested in building a software system for my business.";
    return `https://wa.me/254700000000?text=${encodeURIComponent(text)}`;
  },
  location: "Nairobi, Kenya",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
};

