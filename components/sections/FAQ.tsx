"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:border-primary/50 transition-colors"
    >
      <button
        onClick={onClick}
        className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left group cursor-pointer"
      >
        <span className="text-lg md:text-xl font-semibold text-white pr-8 group-hover:text-primary transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 text-gray-400 text-base md:text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const faqs = [
  {
    question: "What is ZappCash?",
    answer: "ZappCash is a digital payment platform built specifically for Costa Rica, allowing you to send and receive USDC (stablecoin) instantly, with zero fees. It combines the stability of the US dollar with the speed and convenience of cryptocurrency."
  },
  {
    question: "How is ZappCash different from traditional banking?",
    answer: "Unlike traditional banks, ZappCash offers instant transfers 24/7, zero transaction fees, and no minimum balance requirements. Your money is stored in USDC on the blockchain, giving you full control and transparency over your funds."
  },
  {
    question: "What is USDC and why should I use it?",
    answer: "USDC is a stablecoin pegged 1:1 to the US dollar, meaning it maintains a stable value. This gives you the benefits of cryptocurrency (instant transfers, low costs, transparency) without the volatility of other cryptocurrencies like Bitcoin."
  },
  {
    question: "Is my money safe with ZappCash?",
    answer: "Yes. Your USDC is stored on a secure blockchain, and ZappCash uses industry-leading security practices including encryption and secure authentication. USDC is backed by fully reserved assets and regulated by financial authorities."
  },
  {
    question: "How do I get started?",
    answer: "Simply join our waitlist to be among the first to access ZappCash when we launch. You'll receive an invitation to download the app, create your account, and start sending and receiving payments in minutes."
  },
  {
    question: "Are there any fees?",
    answer: "ZappCash charges zero fees for peer-to-peer transactions. We believe in transparent, accessible financial services for everyone in Costa Rica."
  },
  {
    question: "Can I use ZappCash for business?",
    answer: "Absolutely! We offer B2B solutions including business dashboards for USDC payroll, mass payments, detailed reports, and compliance tools. Perfect for companies looking to modernize their payment infrastructure."
  },
  {
    question: "What happens if I lose my phone?",
    answer: "Your account is protected by secure authentication. If you lose your phone, you can recover your account on a new device using your recovery credentials. Your funds remain safe on the blockchain."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="orb-green absolute top-1/4 -left-32 w-96 h-96 opacity-10" />
      <div className="orb-green absolute bottom-1/4 -right-32 w-96 h-96 opacity-10" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about ZappCash
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            Still have questions?
          </p>
          <a href="mailto:support@zappcash.com" className="inline-block">
            <InteractiveHoverButton
              text="Contact our team"
              hoverBgColor="bg-primary"
              showDot={false}
              className="!bg-primary border border-primary/30 text-black hover:!bg-primary hover:text-black"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
