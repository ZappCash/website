"use client";

import Image from "next/image";

interface MacBookMockupProps {
  src: string;
  alt: string;
}

export function MacBookMockup({ src, alt }: MacBookMockupProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Floating Image with Shadow */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Reflection/Shadow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-12 opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.9), transparent 70%)",
        }}
      />
    </div>
  );
}
