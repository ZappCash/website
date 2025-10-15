'use client';

import Link from 'next/link';
import Image from 'next/image';

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative w-12 h-12">
        <Image
          src="/images/Zap.png"
          alt="Zap Icon"
          fill
          className="object-contain transition-all duration-300 group-hover:scale-110"
          priority
        />
      </div>
      <span className="text-white font-black text-xl lg:text-2xl tracking-tight">
        ZAPPCASH
      </span>
    </Link>
  );
}
