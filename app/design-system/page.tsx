"use client";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer } from "@/lib/animations";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Section>
        <h1 className="text-5xl font-black text-white mb-8">
          Design System & Components
        </h1>

        {/* Buttons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Buttons</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl text-gray-300 mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-gray-300 mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Glass Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Glass Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard variant="default">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Default Glass Card</h3>
                <p className="text-gray-300">
                  This is a default glass card with subtle blur and transparency.
                </p>
              </div>
            </GlassCard>

            <GlassCard variant="strong">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Strong Glass Card</h3>
                <p className="text-gray-300">
                  This is a strong glass card with more prominent glassmorphism effect.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Gradient Text */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Gradient Text</h2>

          <div className="space-y-4">
            <h3 className="text-4xl font-black">
              <GradientText>Static Gradient Text</GradientText>
            </h3>
            <h3 className="text-4xl font-black">
              <GradientText animated>Animated Gradient Text</GradientText>
            </h3>
          </div>
        </div>

        {/* Animations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Framer Motion Animations</h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Fade In Up</h3>
                  <p className="text-gray-300">This element fades in from bottom</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Fade In Left</h3>
                  <p className="text-gray-300">This element slides in from left</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Fade In Right</h3>
                  <p className="text-gray-300">This element slides in from right</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={scaleIn}>
              <GlassCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Scale In</h3>
                  <p className="text-gray-300">This element zooms in</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Section Component */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Section Component</h2>
          <div className="border border-primary/30 rounded-lg overflow-hidden">
            <Section className="bg-dark-900/50">
              <h3 className="text-2xl font-bold text-white">Regular Section</h3>
              <p className="text-gray-300 mt-2">With responsive padding</p>
            </Section>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Background Gradients</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl text-gray-300 mb-3">Primary Gradient (Verde oscuro → Verde esmeralda)</h3>
              <div
                className="h-40 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0D2818 0%, #50C878 100%)' }}
              >
                <p className="text-white font-bold text-xl">bg-gradient-primary</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-gray-300 mb-3">Hero Gradient (Verde oscuro → Negro)</h3>
              <div
                className="h-40 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(180deg, #0D2818 0%, #0a0a0a 100%)' }}
              >
                <p className="text-white font-bold text-xl">bg-hero-gradient</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-gray-300 mb-3">Gradient con Orbs</h3>
              <div className="relative h-60 bg-dark-950 rounded-lg overflow-hidden flex items-center justify-center">
                <div
                  className="absolute top-0 left-1/4 w-96 h-96 rounded-full animate-float"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3), transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none'
                  }}
                ></div>
                <div
                  className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 204, 102, 0.3), transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                    animation: 'float 6s ease-in-out infinite 1s'
                  }}
                ></div>
                <p className="text-white font-bold text-xl z-10 relative">Orbs animados en fondo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Color Palette</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-primary rounded-lg"></div>
              <p className="text-sm text-gray-300">Primary (#00FF88)</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-secondary rounded-lg"></div>
              <p className="text-sm text-gray-300">Secondary (#00CC66)</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-dark-900 border border-gray-700 rounded-lg"></div>
              <p className="text-sm text-gray-300">Dark 900</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-dark-800 border border-gray-700 rounded-lg"></div>
              <p className="text-sm text-gray-300">Dark 800</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
