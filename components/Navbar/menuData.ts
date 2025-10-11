import {
  Repeat,
  Mail,
  Users,
  QrCode,
  CreditCard,
  Building2,
  BookOpen,
  MessageCircle,
  FileText,
  Info,
  Briefcase,
  LifeBuoy,
  Coins
} from 'lucide-react';
import { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  {
    label: 'Features',
    hasDropdown: true,
    dropdownItems: [
      {
        icon: Repeat,
        title: 'Recurring Payments',
        description: 'Automate your subscriptions and salary payments',
        href: '#features'
      },
      {
        icon: Mail,
        title: 'Shared Envelopes',
        description: 'Save and budget together with family or teams',
        href: '#features'
      },
      {
        icon: Users,
        title: 'Social Payments',
        description: 'Send money to friends instantly by username',
        href: '#features'
      },
      {
        icon: QrCode,
        title: 'QR Payments',
        description: 'Scan and pay with your unique ZappCode',
        href: '#features'
      },
      {
        icon: CreditCard,
        title: 'Virtual Card',
        description: 'Shop online with full control and security',
        href: '#features'
      },
      {
        icon: Building2,
        title: 'Enterprise Solutions',
        description: 'Advanced tools for businesses and teams',
        href: '#features'
      }
    ]
  },
  {
    label: 'Support',
    hasDropdown: true,
    dropdownItems: [
      {
        icon: LifeBuoy,
        title: '24/7 Customer Support',
        description: 'Support engineers are standing by to help',
        href: '/support/customer'
      },
      {
        icon: Coins,
        title: 'Finance Assets',
        description: 'Info on supported assets, crypto rewards, and more',
        href: '/support/assets'
      }
    ]
  },
  {
    label: 'Learn',
    hasDropdown: true,
    dropdownItems: [
      {
        icon: BookOpen,
        title: 'How It Works',
        description: 'Understand the ZappCash payment flow',
        href: '#how-it-works'
      },
      {
        icon: FileText,
        title: 'Documentation',
        description: 'Complete guides and API references',
        href: '/docs'
      },
      {
        icon: MessageCircle,
        title: 'FAQ',
        description: 'Answers to frequently asked questions',
        href: '#faq'
      }
    ]
  },
  {
    label: 'Company',
    hasDropdown: true,
    dropdownItems: [
      {
        icon: Info,
        title: 'About Us',
        description: 'Learn about our mission and values',
        href: '/about'
      },
      {
        icon: Briefcase,
        title: 'Careers',
        description: 'Join our team and build the future',
        href: '/careers'
      },
      {
        icon: MessageCircle,
        title: 'Contact',
        description: 'Get in touch with our team',
        href: '/contact'
      }
    ]
  }
];
