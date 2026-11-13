import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Estimator from "@/components/Estimator";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F5F5F5] selection:bg-[#F59E0B] selection:text-black">
      {/* Signature 2.5s Curtain Intro Loader */}
      <IntroLoader />

      <Navbar />
      <main>
        <Hero />
        <Services />
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
