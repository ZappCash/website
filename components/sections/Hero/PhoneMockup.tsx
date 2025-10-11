"use client";

import { motion, MotionValue } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
        {/* iPhone Frame - Realistic casing */}
        <div className="relative w-[380px] aspect-[9/17] rounded-[3rem] bg-[#1c1c1e] p-[14px] shadow-2xl" style={{ transform: 'scale(0.7)' }}>
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[120px] w-[3px] h-[32px] bg-[#1c1c1e] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[170px] w-[3px] h-[60px] bg-[#1c1c1e] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[240px] w-[3px] h-[60px] bg-[#1c1c1e] rounded-l-sm" />
          <div className="absolute -right-[3px] top-[180px] w-[3px] h-[80px] bg-[#1c1c1e] rounded-r-sm" />

          {/* Metallic border */}
          <div className="absolute inset-0 rounded-[3rem] border-[2px] border-[#3a3a3c]" />

          {/* Screen */}
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
            {/* Dynamic Island */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-50 shadow-lg border border-white/10" />

            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xl flex items-end justify-between px-8 pb-2 z-40">
              <span className="text-sm font-semibold text-white">9:41</span>
              <div className="flex gap-1 items-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
            </div>

            {/* App Content - Dashboard */}
            <div className="absolute inset-0 pt-[60px] px-6 pb-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40">
                    <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ZappCash
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>

              {/* Balance Card with improved glassmorphism */}
              <div
                className="relative mb-8 p-6 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.15) 0%, rgba(0, 204, 255, 0.15) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 255, 136, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Internal glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

                <div className="relative z-10">
                  <p className="text-gray-300 text-sm mb-2 font-medium">Total Balance</p>
                  <p className="text-5xl font-black text-white mb-6 tracking-tight">$1250</p>
                  <div className="flex gap-3">
                    <button className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-black text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                      Send
                    </button>
                    <button className="h-12 flex-1 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white text-sm border border-white/20 hover:bg-white/15 transition-all">
                      Receive
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="space-y-1">
                <h3 className="text-white font-bold text-base mb-3">Recent Activity</h3>
                {[
                  { name: 'Coffee Shop', amount: '-₡2,500', time: '2m ago', type: 'expense' },
                  { name: 'Salary Deposit', amount: '+₡450,000', time: '1h ago', type: 'income' },
                  { name: 'Uber Ride', amount: '-₡8,500', time: '3h ago', type: 'expense' },
                ].map((tx, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${tx.type === 'income' ? 'bg-primary/20' : 'bg-red-500/20'} flex items-center justify-center`}>
                        <svg className={`w-5 h-5 ${tx.type === 'income' ? 'text-primary' : 'text-red-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tx.type === 'income' ? 'M7 11l5-5m0 0l5 5m-5-5v12' : 'M17 13l-5 5m0 0l-5-5m5 5V6'} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{tx.name}</p>
                        <p className="text-xs text-gray-400">{tx.time}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-primary' : 'text-red-400'}`}>{tx.amount}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white/40 rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
