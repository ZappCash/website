'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NavbarDropdownItem } from './NavbarDropdownItem';
import { DropdownItem } from './types';

interface NavbarDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15
    }
  }
};

export function NavbarDropdown({ items, isOpen, onClose, triggerRef }: NavbarDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] max-w-[90vw] z-50"
          role="menu"
          aria-label="Dropdown menu"
        >
          {/* Arrow pointing to navbar */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[14px] border-b-dark-800/95" />

          {/* Dropdown Content */}
          <div className="bg-dark-800/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="space-y-2">
              {items.map((item, index) => (
                <NavbarDropdownItem
                  key={index}
                  item={item}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
