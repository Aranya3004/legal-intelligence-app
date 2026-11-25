'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme, type Theme } from '@/lib/useTheme';
import { Scale, Phone, ExternalLink, Sun, Moon, Laptop, ChevronDown, ShieldAlert } from 'lucide-react';

const NEXT: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' };

const HOTLINES = [
  { label: 'Labour Affairs Helpline', number: '16357', desc: 'Ministry of Labour & Employment' },
  { label: 'BD National Emergency', number: '999', desc: 'Police · Fire · Ambulance' },
  { label: 'BLAST Legal Aid Trust', number: '02-8391970', desc: 'Bangladesh Legal Aid Services' },
];

export function Header({ title }: { title: string }) {
  const { theme, setTheme } = useTheme();
  const [showHelpline, setShowHelpline] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowHelpline(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top flex items-center justify-between gap-3 px-4 py-2 bg-white/80 backdrop-blur border-b border-stone-200 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <h1 className="t font-bold text-base text-[#1a2f23] tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Search laws, sections, cases…"
          aria-label="Search matters and documents"
          className="text-xs bg-stone-100 border border-stone-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#006a4e] hidden sm:block w-48 lg:w-64"
        />

        {/* Emergency Helpline Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowHelpline(!showHelpline)}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#1a2f23] transition border border-stone-200"
            aria-label="Emergency Legal Helplines"
          >
            <Phone className="w-3.5 h-3.5 text-[#f42a41]" />
            <span className="hidden md:inline">Helplines</span>
            <ChevronDown className="w-3 h-3 text-stone-500" />
          </button>

          {showHelpline && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 z-50 text-xs">
              <div className="font-bold text-[#1a2f23] text-xs pb-2 border-b border-stone-100 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#006a4e]" />
                Official BD Helplines
              </div>
              <div className="space-y-2 mt-2">
                {HOTLINES.map((h, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 transition">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#1a2f23]">{h.label}</span>
                      <span className="text-[#f42a41] font-mono">{h.number}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          className="btn s sm flex items-center gap-1.5 text-xs"
          onClick={() => setTheme(NEXT[theme])}
          aria-label={`Theme: ${theme}. Switch to ${NEXT[theme]}`}
        >
          {theme === 'dark' ? <Moon className="w-3 h-3" /> : theme === 'light' ? <Sun className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
          <span className="capitalize">{theme}</span>
        </button>
      </div>
    </header>
  );
}
