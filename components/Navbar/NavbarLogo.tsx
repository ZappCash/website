'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
        <Zap className="w-5 h-5 text-dark-900 fill-dark-900" />
      </div>
      <span className="gradient-text font-black text-xl lg:text-2xl tracking-tight">
        ZAPPCASH
      </span>
    </Link>
  );
}
