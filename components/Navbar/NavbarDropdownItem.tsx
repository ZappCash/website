'use client';

import Link from 'next/link';
import { DropdownItem } from './types';

interface NavbarDropdownItemProps {
  item: DropdownItem;
  onClick?: () => void;
}

export function NavbarDropdownItem({ item, onClick }: NavbarDropdownItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex items-start gap-5 p-4 rounded-xl transition-all duration-200 hover:bg-dark-800/50 group"
      role="menuitem"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-white mb-1 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
