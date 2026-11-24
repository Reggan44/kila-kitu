export const siteConfig = {
  name: "Kila Kitu Technologies",
  shortName: "Kila Kitu Tech",
  legalName: "Kila Kitu Technologies",
  tagline: "End-to-End Software, Web Platforms & Smart Systems",
  description:
    "Kila Kitu Technologies engineers websites, business software, M-Pesa integrations, PCB designs, firmware, IoT devices, and connected hardware in Nairobi, Kenya.",
  domain: "kilakitutech.co.ke",
  url: "https://kilakitutech.co.ke",
  email: "kilakitutechnologies@gmail.com",
  phone: "+254 102 626 545",
  whatsappNumber: "254102626545",
  whatsappUrl: (message?: string) => {
    const text =
      message ||
      "Hi Kila Kitu Technologies! I'm interested in building a software system for my business.";
    return `https://wa.me/254102626545?text=${encodeURIComponent(text)}`;
  },
  location: "Nairobi, Kenya",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
};
