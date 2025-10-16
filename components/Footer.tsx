"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-900 border-t border-primary/20">
      {/* Gradient border top effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Column 1: Logo & Description */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 -mt-12">
              <div className="relative h-32 w-[200px]">
                <Image
                  src="/images/White-Logo.svg"
                  alt="ZappCash Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              The decentralized future of payments
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com/zappcash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@zappcash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/zappcash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/company/zappcash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://github.com/zappcash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Virtual Card
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support/customer"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  24/7 Support
                </Link>
              </li>
              <li>
                <Link
                  href="/support/assets"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Finance Assets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Join Waitlist */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <p className="text-gray-400 text-sm mb-4">
              Be among the first to experience the future of payments.
            </p>
            <SmoothScrollLink href="#waitlist">
              <InteractiveHoverButton
                text="Join Waitlist"
                showDot={false}
                className="text-dark-900 font-semibold text-sm hover:shadow-glow-md transition-all duration-300"
              />
            </SmoothScrollLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-center text-gray-400 text-sm">
            Copyright © {currentYear} ZappCash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
