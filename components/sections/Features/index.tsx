"use client";

import { FeatureItem } from "./FeatureItem";

const features = [
  {
    tag: "📨 Send",
    title: "Send Money in Seconds",
    description: "3 simple steps: recipient → amount → confirm. Multi-method support: Username, wallet address, or QR scan.",
    imageSrc: "/images/features/SendPayment.png",
  },
  {
    tag: "💰 Receive",
    title: "Receive Payments Instantly",
    description: "Share your QR or username. That simple. No hidden fees, no waiting.",
    imageSrc: "/images/features/ReceivePayment.png",
  },
  {
    tag: "📨 Envelopes",
    title: "Individual Digital Envelopes",
    description: "Organize your money like cash, but better. Create personal envelopes for different purposes and manage your budget smartly.",
    imageSrc: "/images/features/SobreIndividual.png",
  },
  {
    tag: "📨 Envelopes",
    title: "Group Digital Envelopes",
    description: "Share envelopes with friends and family. Perfect for group expenses, trips, or splitting bills. Everyone contributes with a simple QR scan.",
    imageSrc: "/images/features/SobreGrupal.png",
  },
  {
    tag: "🔄 Recurring",
    title: "Automate Recurring Payments",
    description: "Save frequent recipients and pay in one tap. Perfect for rent, services, friends.",
    imageSrc: "/images/features/RecurringPayments.png",
  },
  {
    tag: "💳 Card",
    title: "USDC Virtual Card",
    description: "Spend your crypto at any merchant (Coming Soon). Bridge between crypto and the real world.",
    imageSrc: "/images/features/Card.png",
  },
  {
    tag: "🏢 B2B",
    title: "B2B Solutions",
    description: "Business dashboard for USDC payroll. Mass payments, reports, compliance.",
    imageSrc: "/images/features/HomeView.png",
  },
  {
    tag: "⚡ Social",
    title: "Social Payments, No Hassle",
    description: "Contact directory, history, and @username search. Manage your connections like a social network.",
    imageSrc: "/images/features/SocialPayments.png",
  },
];

export function Features() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="orb-green absolute top-1/4 -left-32 w-96 h-96 opacity-10" />
      <div className="orb-green absolute bottom-1/4 -right-32 w-96 h-96 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything you need
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A complete digital payments platform designed for Costa Rica
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              tag={feature.tag}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              reverse={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
