"use client";

import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import { motion, useScroll, useTransform } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface FeatureItemProps {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

export function FeatureItem({ tag, title, description, imageSrc, reverse = false }: FeatureItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Track scroll progress of this feature item (only on desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start center", "end start"] : ["start end", "end start"]
  });

  // Rotation from right to left (-90deg to 0deg) - only on desktop
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-90, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  return (
    <div ref={containerRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`space-y-6 ${reverse ? 'lg:order-2' : ''}`}
      >
        {/* Tag */}
        <div className="inline-block">
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30">
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}
        <InteractiveHoverButton
          text="Learn More"
          hoverBgColor="bg-white"
          showDot={false}
          className="!bg-white/5 border border-white/10 text-white hover:!bg-white hover:text-black"
        />
      </motion.div>

      {/* Mockup Column with 3D Rotation */}
      <div className={`flex items-center justify-center ${reverse ? 'lg:order-1' : ''}`} style={!isMobile ? { perspective: "2000px" } : {}}>
        <motion.div
          // Mobile: simple whileInView animation with 2D rotation
          // Desktop: scroll-driven 3D rotation
          {...(isMobile ? {
            initial: { opacity: 0, x: reverse ? 50 : -50, scale: 0.9, rotateZ: reverse ? 15 : -15 },
            whileInView: { opacity: 1, x: 0, scale: 1, rotateZ: 0 },
            viewport: { once: true, margin: "-100px" },
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          } : {
            style: {
              rotateY,
              opacity,
              scale,
              transformStyle: "preserve-3d" as const,
            }
          })}
          className="relative w-full scale-[0.45] sm:scale-[0.55] lg:scale-[0.65]"
        >
          {/* Green Gradient Glow Behind Mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 lg:-translate-x-[60%] -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
            {/* Desktop: Full blur effects */}
            {!isMobile ? (
              <>
                <div className="absolute inset-0 rounded-full opacity-80" style={{
                  background: 'radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, rgba(0, 255, 136, 0.5) 20%, rgba(0, 204, 102, 0.3) 40%, transparent 70%)',
                  filter: 'blur(100px)'
                }} />
                <div className="absolute inset-0 rounded-full opacity-60 animate-pulse" style={{
                  background: 'radial-gradient(circle, rgba(0, 255, 136, 1) 0%, rgba(0, 204, 102, 0.6) 30%, transparent 60%)',
                  filter: 'blur(60px)'
                }} />
              </>
            ) : (
              /* Mobile: Lighter glow without heavy blur */
              <div className="absolute inset-0 rounded-full opacity-50" style={{
                background: 'radial-gradient(circle, rgba(0, 255, 136, 0.6) 0%, rgba(0, 255, 136, 0.3) 30%, transparent 60%)',
                filter: 'blur(40px)'
              }} />
            )}
          </div>

          <div className="relative z-10">
            <IPhoneMockup
              src={imageSrc}
              alt={title}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
