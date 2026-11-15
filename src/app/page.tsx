import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Estimator from "@/components/Estimator";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07090E] text-[#F8FAFC] selection:bg-[#F59E0B] selection:text-[#07090E] blueprint-grid">
      {/* 2.6s NVIDIA-Style Architectural Grid Intro Loader */}
      <IntroLoader />

      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Estimator />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
