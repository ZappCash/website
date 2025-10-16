import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyZappCash } from "@/components/sections/WhyZappCash";
import { Features } from "@/components/sections/Features";
import { JoinWaitlist } from "@/components/sections/JoinWaitlist";
import { FAQ } from "@/components/sections/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <WhyZappCash />
      <Features />
      <JoinWaitlist />
      <FAQ />
      <Footer />
    </main>
  );
}
