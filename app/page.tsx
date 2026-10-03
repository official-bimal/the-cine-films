import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProofPoints from "@/components/ProofPoints";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// Every section reads its content from the database (with a code-level
// fallback where noted per component). Full page cache, revalidated once a
// minute — an admin edit also calls revalidatePath("/") directly (see
// lib/actions/*.ts), so changes show up immediately rather than waiting out
// this window; this is just the ceiling for how stale a cold cache can get.
export const revalidate = 60;

// The root layout supplies title/description from Site Settings; this adds the canonical
// URL for the home page (other pages set their own).
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <ProofPoints />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
