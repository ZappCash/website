import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
