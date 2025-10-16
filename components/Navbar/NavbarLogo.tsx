'use client';

import Link from 'next/link';
import Image from 'next/image';

export function NavbarLogo() {
  return (
    <Link href="/" className="group">
      <div className="relative h-12 w-40">
        <Image
          src="/images/White-Logo.svg"
          alt="ZappCash Logo"
          fill
          className="object-contain transition-all duration-300 group-hover:scale-105"
          priority
        />
      </div>
    </Link>
  );
}
