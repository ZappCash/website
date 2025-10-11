import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyZappCash } from "@/components/sections/WhyZappCash";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <WhyZappCash />
      <Footer />
    </main>
  );
}
