import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import HardwareLab from "@/components/HardwareLab";
import Services from "@/components/Services";
import Consultation from "@/components/Consultation";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08090D] text-[#F3F4F6] selection:bg-[#F59E0B] selection:text-[#08090D]">
      {/* 2.45s Isolated Architectural Intro Loader */}
      <IntroLoader />

      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <HardwareLab />
        <Services />
        <Consultation />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
