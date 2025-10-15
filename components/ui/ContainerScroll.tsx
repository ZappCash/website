"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface ContainerScrollProps {
  children: ReactNode;
  titleSlot?: ReactNode;
}

export function ContainerScroll({ children, titleSlot }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: "1000px" }}
      >
        {/* Title */}
        {titleSlot && (
          <motion.div
            style={{ translateY }}
            className="mx-auto max-w-5xl text-center mb-10"
          >
            {titleSlot}
          </motion.div>
        )}

        {/* Card with 3D effect */}
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow:
              "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
        >
          <div className="size-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4 dark:bg-zinc-900">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
