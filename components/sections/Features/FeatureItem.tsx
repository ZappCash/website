"use client";

import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureItemProps {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

export function FeatureItem({ tag, title, description, imageSrc, reverse = false }: FeatureItemProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
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
        <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300">
          <span className="text-white font-medium">Learn More</span>
          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Mockup Column */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex items-center justify-center ${reverse ? 'lg:order-1' : ''}`}
      >
        <div className="relative w-full scale-[0.4] sm:scale-[0.5] lg:scale-[0.55]">
          {/* Green Gradient Glow Behind Mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
            <div className="absolute inset-0 rounded-full opacity-60" style={{
              background: 'radial-gradient(circle, rgba(0, 255, 136, 0.6) 0%, rgba(0, 255, 136, 0.3) 20%, rgba(0, 204, 102, 0.2) 40%, transparent 70%)',
              filter: 'blur(100px)'
            }} />
            <div className="absolute inset-0 rounded-full opacity-40 animate-pulse" style={{
              background: 'radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, rgba(0, 204, 102, 0.4) 30%, transparent 60%)',
              filter: 'blur(60px)'
            }} />
          </div>

          <div className="relative z-10">
            <IPhoneMockup
              src={imageSrc}
              alt={title}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
