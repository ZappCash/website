"use client";

import { motion, MotionValue } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";

interface PhoneMockupProps {
  devicesScale: MotionValue<number>;
  devicesTranslateY: MotionValue<number>;
  phoneRotation: MotionValue<number>;
}

export function PhoneMockup({ devicesScale, devicesTranslateY, phoneRotation }: PhoneMockupProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="mt-40 relative flex items-center justify-center max-w-[1400px] mx-auto w-full"
      style={{
        scale: devicesScale,
        y: devicesTranslateY,
      }}
    >
      <motion.div
        className="relative"
        style={{
          filter: 'drop-shadow(0 40px 80px rgba(0, 0, 0, 0.5))',
          rotateZ: phoneRotation,
        }}
      >
        <div className="scale-[0.6]">
          <IPhoneMockup
            src="/images/features/HomeView.png"
            alt="ZappCash Home"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
