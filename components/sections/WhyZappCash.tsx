"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

// Lazy load WorldMap component with priority loading
const WorldMap = dynamic(
  () => import("@/components/WorldMap").then(mod => mod.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-primary/30 text-sm animate-pulse">Loading map...</div>
      </div>
    ),
  }
);


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

function NarrativeContent() {
  const { ref, isInView } = useInViewAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="space-y-8"
    >
      {/* Main Narrative */}
      <motion.div variants={fadeInUp} className="space-y-6 mt-8">
        <GlassCard className="p-8 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold">
            The world moved forward.
            <br />
            <GradientText>Your wallet should too.</GradientText>
          </h3>

          <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              Traditional payment systems charge high fees, impose limits, and
              control your money. They were built for borders and banking
              hours—not for today&apos;s global economy.
            </p>

            <p>
              <span className="text-white font-semibold">ZappCash</span> gives
              you <span className="text-primary">complete control</span> of your
              funds, connects you to{" "}
              <span className="text-primary">global markets instantly</span>,
              and charges a fraction of legacy fees. Self-custody, borderless,
              and always on.
            </p>
          </div>
        </GlassCard>
      </motion.div>

    </motion.div>
  );
}

function GlobalConnections() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start loading immediately after initial page render
    const timer = setTimeout(() => {
      setShouldLoadMap(true);
    }, 1000); // Load after 1 second of page load

    return () => clearTimeout(timer);
  }, []);

  // Red de Conectividad Financiera Global - Conexiones estratégicas de alto impacto
  const connections = [
    // === América del Norte - Europa (Transatlántico) ===
    {
      start: { lat: 40.7128, lng: -74.006 }, // Nueva York
      end: { lat: 51.5074, lng: -0.1278 }, // Londres
    },
    {
      start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      end: { lat: 51.5074, lng: -0.1278 }, // Londres
    },
    {
      start: { lat: 40.7128, lng: -74.006 }, // Nueva York
      end: { lat: 50.1109, lng: 8.6821 }, // Fráncfort
    },
    {
      start: { lat: 43.6532, lng: -79.3832 }, // Toronto
      end: { lat: 51.5074, lng: -0.1278 }, // Londres
    },

    // === Europa - Asia ===
    {
      start: { lat: 51.5074, lng: -0.1278 }, // Londres
      end: { lat: 1.3521, lng: 103.8198 }, // Singapur
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // Londres
      end: { lat: 22.3193, lng: 114.1694 }, // Hong Kong
    },
    {
      start: { lat: 50.1109, lng: 8.6821 }, // Fráncfort
      end: { lat: 35.6762, lng: 139.6503 }, // Tokio
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // Londres
      end: { lat: 25.2048, lng: 55.2708 }, // Dubái
    },
    {
      start: { lat: 48.8566, lng: 2.3522 }, // París
      end: { lat: 31.2304, lng: 121.4737 }, // Shanghái
    },

    // === Asia - Oceanía ===
    {
      start: { lat: 1.3521, lng: 103.8198 }, // Singapur
      end: { lat: -33.8688, lng: 151.2093 }, // Sídney
    },
    {
      start: { lat: 22.3193, lng: 114.1694 }, // Hong Kong
      end: { lat: -33.8688, lng: 151.2093 }, // Sídney
    },

    // === Asia - Oriente Medio / África ===
    {
      start: { lat: 1.3521, lng: 103.8198 }, // Singapur
      end: { lat: 25.2048, lng: 55.2708 }, // Dubái
    },
    {
      start: { lat: 19.076, lng: 72.8777 }, // Bombay
      end: { lat: 25.2048, lng: 55.2708 }, // Dubái
    },

    // === América del Norte - Asia (Transpacífico) ===
    {
      start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      end: { lat: 31.2304, lng: 121.4737 }, // Shanghái
    },
    {
      start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      end: { lat: 39.9042, lng: 116.4074 }, // Pekín
    },
    {
      start: { lat: 40.7128, lng: -74.006 }, // Nueva York
      end: { lat: 35.6762, lng: 139.6503 }, // Tokio
    },

    // === América del Norte - América Latina ===
    {
      start: { lat: 40.7128, lng: -74.006 }, // Nueva York
      end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    },
    {
      start: { lat: 34.0522, lng: -118.2437 }, // Los Ángeles
      end: { lat: 19.4326, lng: -99.1332 }, // Ciudad de México
    },
    {
      start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      end: { lat: -23.5505, lng: -46.6333 }, // São Paulo
    },
    {
      start: { lat: 40.7128, lng: -74.006 }, // Nueva York
      end: { lat: 9.9281, lng: -84.0907 }, // San José, Costa Rica
    },

    // === América Latina - Europa ===
    {
      start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      end: { lat: 51.5074, lng: -0.1278 }, // Londres
    },
    {
      start: { lat: 19.4326, lng: -99.1332 }, // Ciudad de México
      end: { lat: 40.4168, lng: -3.7038 }, // Madrid
    },

    // === África - Europa ===
    {
      start: { lat: -26.2041, lng: 28.0473 }, // Johannesburgo
      end: { lat: 51.5074, lng: -0.1278 }, // Londres
    },
    {
      start: { lat: 6.5244, lng: 3.3792 }, // Lagos
      end: { lat: 51.5074, lng: -0.1278 }, // Londres
    },

    // === Intra-Continental (Clave) ===
    // Norteamérica
    {
      start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      end: { lat: 40.7128, lng: -74.006 }, // Nueva York
    },
    // Europa
    {
      start: { lat: 51.5074, lng: -0.1278 }, // Londres
      end: { lat: 48.8566, lng: 2.3522 }, // París
    },
    // Asia
    {
      start: { lat: 31.2304, lng: 121.4737 }, // Shanghái
      end: { lat: 1.3521, lng: 103.8198 }, // Singapur
    },
    // América Latina
    {
      start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      end: { lat: 19.4326, lng: -99.1332 }, // Ciudad de México
    },
    {
      start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      end: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
    },
    {
      start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      end: { lat: 4.7110, lng: -74.0721 }, // Bogotá
    },
    {
      start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      end: { lat: -33.4489, lng: -70.6693 }, // Santiago
    },
    {
      start: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      end: { lat: 9.9281, lng: -84.0907 }, // San José, Costa Rica
    },
    // Oriente Medio
    {
      start: { lat: 25.2048, lng: 55.2708 }, // Dubái
      end: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv
    },
    // África
    {
      start: { lat: -26.2041, lng: 28.0473 }, // Johannesburgo
      end: { lat: 6.5244, lng: 3.3792 }, // Lagos
    },
  ];

  return (
    <div ref={mapContainerRef} className="relative w-full min-h-[500px] flex flex-col">
      {/* Label */}
      <div className="mb-6 text-center">
        <p className="text-lg font-bold">
          <GradientText>Global Connectivity</GradientText>
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Send money instantly to anywhere in the world
        </p>
      </div>

      {/* WorldMap - Expanded */}
      <div className="relative flex-1 w-full">
        {/* Animated orb background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="orb-green absolute w-96 h-96 opacity-10" />
          <div className="orb-cyan absolute w-64 h-64 opacity-5" />
        </div>

        {shouldLoadMap ? (
          <WorldMap dots={connections} lineColor="#00FF88" />
        ) : (
          <div className="w-full h-full flex items-center justify-center min-h-[400px]">
            <div className="text-primary/20 text-sm">Preparing map...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function WhyZappCash() {
  const { ref, isInView } = useInViewAnimation({ amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-8 md:py-12 px-4 overflow-hidden"
    >
      {/* Gradient transition from hero */}
      <div className="absolute -top-32 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/30 to-black pointer-events-none z-10" />

      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="orb-green absolute top-1/4 -left-32 w-96 h-96 opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
            Why <GradientText animated>ZappCash</GradientText>?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Traditional payment systems have limits. We don&apos;t.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Narrative Content */}
          <div>
            <NarrativeContent />
          </div>

          {/* Right: Global Connections Map */}
          <div className="lg:sticky lg:top-24">
            <GlobalConnections />
          </div>
        </div>
      </div>
    </section>
  );
}
