"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

export function Toast({ message, type, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          {/* Animated border similar to waitlist card */}
          <div className="relative">
            <motion.div
              className="absolute -inset-[1px] rounded-xl"
              style={{
                background: type === "success"
                  ? "linear-gradient(90deg, transparent, #00FF88, transparent)"
                  : "linear-gradient(90deg, transparent, #FF0044, transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Toast content */}
            <div className="relative bg-zinc-950 rounded-xl p-4 backdrop-blur-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                {type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
                <p className={`font-medium ${type === "success" ? "text-primary" : "text-red-400"}`}>
                  {message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
