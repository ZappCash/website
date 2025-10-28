"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Toast } from "@/components/ui/Toast";

export function JoinWaitlist() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (supabaseError) {
        // Manejar error de email duplicado
        if (supabaseError.code === '23505') {
          setToastMessage('This email is already on the waitlist!');
        } else {
          setToastMessage('Something went wrong. Please try again.');
        }
        setToastType('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setIsSubmitting(false);
        return;
      }

      // Éxito
      setToastMessage('🎉 You\'re on the list! We\'ll be in touch soon.');
      setToastType('success');
      setShowToast(true);
      setEmail("");
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setToastMessage('Something went wrong. Please try again.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast notification */}
      <Toast message={toastMessage} type={toastType} isVisible={showToast} />

      <section id="waitlist" className="relative py-16 md:py-24 px-4 overflow-hidden mb-16">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/5 to-black" />
        {/* Grid pattern background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Simple heading */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">
            Join the <span className="text-primary">Waitlist</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Be among the first to experience the future of financial freedom
          </p>
        </div>

        {/* Animated card */}
        <div className="relative">
          {/* Animated border effect - same as footer */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl"
            style={{
              background: "linear-gradient(90deg, transparent, #00FF88, transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Card content */}
          <div className="relative bg-zinc-950 rounded-2xl p-8 md:p-12 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input with animations */}
              <div className="relative group/input">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={cn(
                    "relative w-full px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-lg",
                    "text-white placeholder:text-gray-500",
                    "focus:outline-none focus:border-zinc-700 focus-visible:!outline-none focus-visible:!border-zinc-700",
                    "transition-all duration-300"
                  )}
                  style={{ outline: 'none' }}
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-center">
                <InteractiveHoverButton
                  type="submit"
                  disabled={isSubmitting || !email}
                  className={cn(
                    "min-w-[200px] text-dark-900 font-semibold transition-all duration-300 justify-center",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                  hoverBgColor="bg-primary"
                  dotColor="bg-dark-900"
                  showDot={false}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </InteractiveHoverButton>
              </div>
            </form>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

      </div>
      </section>
    </>
  );
}
