"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/animations";
import { GradientText } from "@/components/ui/GradientText";
import { ChevronDown, Lock } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [init, setInit] = useState(false);

  // Inicializar tsParticles
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(lastScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular transformaciones basadas en scroll
  const headlineOpacity = Math.max(0, 1 - scrollY / 300);
  const devicesScale = Math.min(1.3, 1 + scrollY / 1000);
  const devicesTranslateY = -scrollY * 0.3; // Parallax
  const showParticles = scrollY < 50; // Ocultar partículas al hacer scroll

  // Configuración de partículas optimizada para rendimiento
  const particlesOptions = useMemo(() => ({
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 30,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: {
          enable: true,
        } as any,
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#00FF88",
        distance: 120,
        enable: true,
        opacity: 0.25,
        width: 0.8,
      },
      move: {
        enable: true,
        random: false,
        speed: 0.2,
        direction: "none" as const,
        outModes: {
          default: "out" as const,
        },
        straight: false,
      },
      number: {
        density: {
          enable: true,
        } as any,
        value: 30,
      },
      opacity: {
        value: 0.4,
      },
      size: {
        value: 1.5,
      },
    },
    detectRetina: true,
    smooth: true,
  }), []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Background Gradient - Base vertical */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            #050505 0%,
            #0a0a0a 20%,
            #0a1510 40%,
            #0c1f14 70%,
            #0D2818 100%
          )`
        }}
      />

      {/* Glow suave desde abajo - Capa 1 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 140% 90% at 50% 100%,
            rgba(0, 255, 136, 0.35) 0%,
            rgba(0, 204, 102, 0.25) 25%,
            rgba(0, 153, 77, 0.15) 45%,
            transparent 65%
          )`,
          filter: 'blur(60px)'
        }}
      />

      {/* Glow intenso desde abajo - Capa 2 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 90% 50% at 50% 100%,
            rgba(0, 255, 136, 0.7) 0%,
            rgba(0, 230, 115, 0.5) 20%,
            rgba(0, 204, 102, 0.3) 40%,
            rgba(0, 153, 77, 0.15) 50%,
            transparent 70%
          )`,
          filter: 'blur(40px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Partículas Animadas con TSParticles - Solo visible en Hero */}
      {init && showParticles && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
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

      {/* Glow Effect en los Bordes Inferiores */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6))'
        }}
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center"
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            variants={fadeInUp}
            className="mb-10 inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 4px 12px rgba(0, 0, 0, 0.1)
              `
            }}
          >
            <Lock className="w-4 h-4 text-white/90" />
            <span className="text-sm font-medium text-white/85 tracking-wide">
              Trusted by thousands since 2024
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[88px] font-black leading-[1.05] mb-7 mx-auto max-w-[900px]"
            style={{
              letterSpacing: '-0.03em',
              opacity: headlineOpacity,
              transform: `translateY(${scrollY * 0.5}px)`,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              textRendering: 'optimizeLegibility',
              willChange: 'transform, opacity',
            }}
          >
            <span className="text-white">
              Seamless payments,{" "}
            </span>
            <GradientText animated>
              proven reliability
            </GradientText>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-[20px] leading-[1.6] max-w-[680px] mx-auto mb-12"
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '0.2px',
              opacity: headlineOpacity,
            }}
          >
            Decentralized payments without limits. Send and receive money instantly
            with ultra-low fees of just <span className="text-primary font-semibold">0.02%</span>.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={scaleIn}
            className="mb-5"
            style={{ opacity: headlineOpacity }}
          >
            <button
              className="inline-flex items-center justify-center gap-3 px-10 py-[18px] min-w-[300px] rounded-full text-[18px] font-semibold text-black transition-all duration-300 ease-out cursor-pointer select-none"
              style={{
                background: 'linear-gradient(135deg, #00FF88 0%, #00CC66 100%)',
                boxShadow: `
                  0 12px 32px rgba(0, 255, 136, 0.4),
                  0 4px 12px rgba(0, 255, 136, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `
                  0 16px 40px rgba(0, 255, 136, 0.5),
                  0 8px 16px rgba(0, 255, 136, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `
                  0 12px 32px rgba(0, 255, 136, 0.4),
                  0 4px 12px rgba(0, 255, 136, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `;
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = `
                  0 8px 24px rgba(0, 255, 136, 0.4),
                  0 4px 8px rgba(0, 255, 136, 0.2)
                `;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `
                  0 16px 40px rgba(0, 255, 136, 0.5),
                  0 8px 16px rgba(0, 255, 136, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `;
              }}
            >
              Join Waitlist
            </button>
          </motion.div>

          {/* Secondary Link */}
          <motion.p
            variants={fadeInUp}
            className="text-[15px] font-medium"
            style={{ opacity: headlineOpacity }}
          >
            <a
              href="#"
              className="transition-all duration-250 ease-out"
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(255, 255, 255, 0.35)',
                textDecorationThickness: '1px',
                textUnderlineOffset: '4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.textDecorationColor = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.textUnderlineOffset = '5px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                e.currentTarget.style.textDecorationColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.textUnderlineOffset = '4px';
              }}
            >
              Available on other devices
            </a>
          </motion.p>
        </div>

        {/* Device Mockups - Laptop + Mobile */}
        <motion.div
          variants={fadeInUp}
          className="mt-20 relative flex items-end justify-center h-[600px] max-w-[1400px] mx-auto w-full"
          style={{
            transform: `scale(${devicesScale}) translateY(${devicesTranslateY}px)`,
            willChange: 'transform',
          }}
        >
          {/* Laptop Mockup */}
          <div
            className="relative z-[2] -mr-[120px]"
            style={{
              transform: 'perspective(1200px) rotateY(-8deg) rotateX(3deg) translateZ(0)',
              filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
              animation: 'floatLaptop 6s ease-in-out infinite',
            }}
          >
            {/* Laptop Frame */}
            <div className="w-[800px] h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-white/20 shadow-2xl shadow-primary/30">
              {/* Screen content */}
              <div className="absolute inset-0 bg-black p-8">
                {/* App mockup content - Dashboard */}
                <div className="h-full flex flex-col">
                  {/* Top bar */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-xl font-bold">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          ZappCash
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="glass-card p-6 rounded-xl mb-6">
                    <p className="text-gray-400 text-sm mb-2">Total Balance</p>
                    <p className="text-4xl font-bold text-white mb-4">₡1,250,000</p>
                    <div className="flex gap-3">
                      <div className="h-10 flex-1 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">Send</span>
                      </div>
                      <div className="h-10 flex-1 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">Receive</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent transactions */}
                  <div className="flex-1 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="glass-card p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20" />
                          <div>
                            <p className="text-sm font-medium text-white">Payment #{i}</p>
                            <p className="text-xs text-gray-400">Just now</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-primary">+₡{(i * 1000).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Mockup */}
          <div
            className="relative z-[1] mb-[60px]"
            style={{
              transform: 'perspective(1200px) rotateY(12deg) rotateX(-2deg) translateZ(0)',
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.35))',
              animation: 'floatMobile 6s ease-in-out infinite 3s',
            }}
          >
            {/* Mobile Frame */}
            <div className="w-[320px] aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-white/20 shadow-2xl shadow-primary/30">
              {/* Screen content */}
              <div className="absolute inset-0 bg-black">
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6">
                  <span className="text-xs text-white">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-sm bg-white/30" />
                    <div className="w-4 h-4 rounded-sm bg-white/30" />
                    <div className="w-4 h-4 rounded-sm bg-white/30" />
                  </div>
                </div>

                {/* App mockup content */}
                <div className="absolute inset-0 top-12 flex flex-col items-center justify-center p-6">
                  {/* ZappCash Logo/Icon */}
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center shadow-lg shadow-primary/50">
                    <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  {/* App name */}
                  <h3 className="text-2xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ZappCash
                    </span>
                  </h3>

                  {/* Tagline */}
                  <p className="text-gray-400 text-sm text-center mb-8">
                    Pagos sin límites
                  </p>

                  {/* Mock UI elements */}
                  <div className="w-full space-y-3">
                    <div className="h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm" />
                    <div className="h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm" />
                  </div>

                  {/* Stats preview */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-6">
                    <div className="glass-card p-3 rounded-xl">
                      <p className="text-xs text-gray-400">Fee</p>
                      <p className="text-lg font-bold text-primary">0.02%</p>
                    </div>
                    <div className="glass-card p-3 rounded-xl">
                      <p className="text-xs text-gray-400">Speed</p>
                      <p className="text-lg font-bold text-primary">Instant</p>
                    </div>
                  </div>
                </div>

                {/* Bottom indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
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

      <style jsx>{`
        @keyframes floatLaptop {
          0%, 100% {
            transform: perspective(1200px) rotateY(-8deg) rotateX(3deg) translateY(0px) translateZ(0);
          }
          50% {
            transform: perspective(1200px) rotateY(-8deg) rotateX(3deg) translateY(-15px) translateZ(0);
          }
        }

        @keyframes floatMobile {
          0%, 100% {
            transform: perspective(1200px) rotateY(12deg) rotateX(-2deg) translateY(0px) translateZ(0);
          }
          50% {
            transform: perspective(1200px) rotateY(12deg) rotateX(-2deg) translateY(-12px) translateZ(0);
          }
        }
      `}</style>
    </section>
  );
}
