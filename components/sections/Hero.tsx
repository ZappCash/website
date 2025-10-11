"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { staggerContainer } from "@/lib/animations";
import { ChevronDown } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { AnimatedGradientBackground } from "@/components/ui/AnimatedGradientBackground";
import { HeroContent } from "./Hero/HeroContent";
import { PhoneMockup } from "./Hero/PhoneMockup";
import { particlesOptions } from "./Hero/particlesConfig";

export function Hero() {
  const [init, setInit] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Framer Motion's useScroll for scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scroll-based transformations using Framer Motion
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const devicesScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const devicesTranslateY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Gradually darken background as user scrolls to reduce saturation
  const backgroundDarkness = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 0.8]);

  // iPhone rotation: starts at -30deg and reaches 0deg on scroll
  const phoneRotation = useTransform(scrollYProgress, [0, 0.25], [-30, 0]);

  // Show/hide particles based on scroll position
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowParticles(window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Animated Gradient Background with Canvas */}
      <AnimatedGradientBackground />

      {/* Dark overlay that appears on scroll to reduce saturation */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.95) 100%)',
          opacity: backgroundDarkness,
        }}
      />

      {/* Animated Particles with TSParticles - Only visible in Hero section */}
      {init && showParticles && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <Particles
            id="tsparticles"
            options={particlesOptions}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}

      {/* Glow effect on bottom edges */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6))'
        }}
      />

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-0 flex flex-col items-center"
      >
        {/* Hero headline, subheadline, and CTA */}
        <HeroContent headlineOpacity={headlineOpacity} />

        {/* iPhone Mockup with scroll animations */}
        <PhoneMockup
          devicesScale={devicesScale}
          devicesTranslateY={devicesTranslateY}
          phoneRotation={phoneRotation}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
      </motion.div>

    </section>
  );
}
