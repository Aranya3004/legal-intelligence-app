'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  FolderOpen,
  FileText,
  Search,
  CheckSquare,
  ShieldCheck,
  Settings,
  Home,
} from 'lucide-react';

export const NAV = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/ai-chat', label: 'AI Assistant', icon: MessageSquare },
  { href: '/acts', label: 'BD Statutes', icon: BookOpen },
  { href: '/matters', label: 'Case Matters', icon: FolderOpen },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/research', label: 'Legal Research', icon: Search },
  { href: '/citations', label: 'Citations', icon: CheckSquare },
  { href: '/validation', label: 'Validation Panel', icon: ShieldCheck },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

export function SidebarNav() {
  const path = usePathname();

  return (
    <nav className="sb" aria-label="Primary Navigation">
      <Link href="/" className="logo flex items-center gap-2 text-white no-underline hover:opacity-90 transition">
        <div className="w-7 h-7 bg-[#f42a41] rounded-full flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="font-bold text-sm block tracking-tight">LegalInfo BD</span>
          <span className="text-[10px] text-[#f9a825] font-semibold uppercase tracking-wider block -mt-1">
            AI Intelligence
          </span>
        </div>
      </Link>

      <ul className="space-y-1 my-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const isActive = path === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`nv flex items-center gap-2.5 text-xs font-semibold py-2 px-3 rounded-lg transition ${
                  isActive ? 'on bg-[#006a4e] text-white font-bold' : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#f9a825]' : 'text-stone-400'}`} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="usr mt-auto">
        <div className="text-[#f9a825] text-[10px] font-bold uppercase tracking-wider">Advocate Workspace</div>
        <b className="text-white text-xs block truncate">A. Chowdhury</b>
        <span className="text-[11px] text-stone-300 block">Supreme Court Bar</span>
        <span className="text-[10px] text-stone-400 block mt-1">Alpha v2.1 · BD Corpus</span>
      </div>
    </nav>
  );
}
