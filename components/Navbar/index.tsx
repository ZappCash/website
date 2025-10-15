'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { NavbarLogo } from './NavbarLogo';
import { NavbarMenuItem } from './NavbarMenuItem';
import { MobileMenu } from './MobileMenu';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { SmoothScrollLink } from '@/components/ui/SmoothScrollLink';
import { menuItems } from './menuData';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Floating Navbar Wrapper */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto px-3 sm:px-4">
        <nav
          className={`
            backdrop-blur-xl rounded-full
            border shadow-2xl
            px-6 sm:px-8 lg:px-12 py-3 lg:py-3.5
            flex items-center gap-8 lg:gap-16
            transition-all duration-300 ease-out
            ${
              isScrolled
                ? 'bg-dark-900/95 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]'
                : 'bg-dark-900/80 border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]'
            }
          `}
        >
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={index} item={item} />
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <SmoothScrollLink href="#waitlist">
              <InteractiveHoverButton
                text="Join Waitlist"
                hoverBgColor="bg-white"
                showDot={false}
                className="shadow-glow-sm hover:shadow-glow-md transition-all duration-300 whitespace-nowrap !bg-white text-black"
              />
            </SmoothScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-dark-800/50 transition-colors text-gray-300 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        menuItems={menuItems}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
