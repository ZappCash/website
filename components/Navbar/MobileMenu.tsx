'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MenuItem, DropdownItem } from './types';
import { Button } from '@/components/ui/Button';
import { SmoothScrollLink } from '@/components/ui/SmoothScrollLink';

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  onClose: () => void;
}

function MobileDropdownItem({ item, onClick }: { item: DropdownItem; onClick: () => void }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-700/50 transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white mb-0.5">{item.title}</h4>
        <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
      </div>
    </Link>
  );
}

function MobileMenuItem({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!item.hasDropdown && item.href) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-dark-700/50 rounded-lg transition-colors font-medium"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-800/50 last:border-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3 px-4 text-gray-300 hover:text-white transition-colors font-medium"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && item.dropdownItems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 px-2 space-y-1">
              {item.dropdownItems.map((dropdownItem, index) => (
                <MobileDropdownItem
                  key={index}
                  item={dropdownItem}
                  onClick={onClose}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileMenu({ isOpen, menuItems, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-dark-900 border-l border-gray-800/50 z-50 md:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-black text-xl">ZAPPCASH</span>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-dark-800 transition-colors text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <nav className="space-y-1 mb-8">
                {menuItems.map((item, index) => (
                  <MobileMenuItem key={index} item={item} onClose={onClose} />
                ))}
              </nav>

              {/* CTA Button */}
              <SmoothScrollLink href="#waitlist" onClick={onClose}>
                <Button variant="primary" size="lg" className="w-full">
                  Join Waitlist
                </Button>
              </SmoothScrollLink>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
