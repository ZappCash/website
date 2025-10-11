import { LucideIcon } from 'lucide-react';

export interface DropdownItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export interface MenuItem {
  label: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
  href?: string;
}
