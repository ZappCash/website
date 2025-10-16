"use client";

import { motion, MotionValue } from "framer-motion";
import { fadeInUp, scaleIn } from "@/lib/animations";
import { GradientText } from "@/components/ui/GradientText";
import { Lock } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

interface HeroContentProps {
  headlineOpacity: MotionValue<number>;
}

export function HeroContent({ headlineOpacity }: HeroContentProps) {
  return (
    <div className="text-center max-w-6xl mx-auto">
      {/* Trust Badge */}
      <motion.div
        variants={fadeInUp}
        className="mb-6 inline-flex items-center gap-3 px-6 py-3 rounded-full"
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
          Trusted by thousands since 2025
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={fadeInUp}
        className="text-6xl sm:text-7xl md:text-8xl lg:text-[88px] font-black leading-[1.05] mb-4 mx-auto max-w-[900px]"
        style={{
          letterSpacing: '-0.03em',
          opacity: headlineOpacity,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
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
        className="text-lg sm:text-xl md:text-[20px] leading-[1.6] max-w-[680px] mx-auto mb-8"
        style={{
          color: 'rgba(255, 255, 255, 0.75)',
          letterSpacing: '0.2px',
          opacity: headlineOpacity,
        }}
      >
        Seamless, secure, self-custodial. Swap, buy, and manage a diverse portfolio in one place.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        variants={scaleIn}
        style={{ opacity: headlineOpacity }}
      >
        <SmoothScrollLink href="#waitlist">
          <InteractiveHoverButton
            text="Join Waitlist"
            hoverBgColor="bg-white"
            showDot={false}
            className="inline-flex items-center justify-center gap-3 px-10 py-[18px] min-w-[300px] text-[18px] !bg-white text-black"
            style={{
              boxShadow: `
                0 12px 32px rgba(255, 255, 255, 0.25),
                0 4px 12px rgba(255, 255, 255, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `
            }}
          />
        </SmoothScrollLink>
      </motion.div>
    </div>
  );
}
