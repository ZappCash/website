'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NavbarDropdown } from './NavbarDropdown';
import { MenuItem } from './types';

interface NavbarMenuItemProps {
  item: MenuItem;
}

export function NavbarMenuItem({ item }: NavbarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!item.hasDropdown && item.href) {
    return (
      <Link
        href={item.href}
        className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-base"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-colors duration-200 font-medium text-base group bg-transparent focus:outline-none focus:ring-0 focus:bg-transparent ${
          isOpen ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {item.dropdownItems && (
        <NavbarDropdown
          items={item.dropdownItems}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          triggerRef={triggerRef}
        />
      )}
    </div>
  );
}
