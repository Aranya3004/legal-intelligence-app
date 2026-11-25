'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Scale,
  ExternalLink,
  ChevronRight,
  Filter,
  FileCheck2,
  Copy,
  Check,
} from 'lucide-react';
import { Workspace } from '@/components/Layout/Workspace';
import { LEGAL_ACTS, FEATURED_SECTIONS, LegalSection, LegalActMeta } from '@/lib/bdLegalCorpus';

export default function ActsPage() {
  const [selectedActId, setSelectedActId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<LegalSection | null>(FEATURED_SECTIONS[0]);
  const [copiedNo, setCopiedNo] = useState<string | null>(null);

  const filteredSections = FEATURED_SECTIONS.filter((sec) => {
    const matchesAct =
      selectedActId === 'all' ||
      (selectedActId === 'companies-1994' && sec.actTitle.includes('Companies')) ||
      (selectedActId === 'contract-1872' && sec.actTitle.includes('Contract')) ||
      (selectedActId === 'partnership-1932' && sec.actTitle.includes('Partnership')) ||
      (selectedActId === 'labour-2006' && sec.actTitle.includes('Labour'));

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      sec.sectionNo.toLowerCase().includes(q) ||
      sec.titleEn.toLowerCase().includes(q) ||
      sec.titleBn.toLowerCase().includes(q) ||
      sec.summary.toLowerCase().includes(q);

    return matchesAct && matchesQuery;
  });

  const handleCopyCitation = (sec: LegalSection) => {
    const text = `${sec.actTitle}, ${sec.sectionNo} — "${sec.titleEn}"`;
    navigator.clipboard.writeText(text);
    setCopiedNo(sec.sectionNo);
    setTimeout(() => setCopiedNo(null), 2000);
  };

  return (
    <Workspace title="Bangladesh Statutory Acts & Legislation Explorer">
      <div className="space-y-6">
        {/* Act Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedActId('all')}
            className={`p-3.5 rounded-xl border text-left transition ${
              selectedActId === 'all'
                ? 'bg-[#006a4e] text-white border-[#006a4e] shadow-sm'
                : 'bg-white border-stone-200 hover:border-stone-300 text-[#1a2f23]'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-75">All Ingested Acts</div>
            <div className="font-serif font-bold text-base mt-1">Full Legal Corpus</div>
            <div className="text-xs opacity-80 mt-1">4 Acts · 1,000+ Sections</div>
          </button>

          {LEGAL_ACTS.map((act) => (
            <button
              key={act.id}
              onClick={() => setSelectedActId(act.id)}
              className={`p-3.5 rounded-xl border text-left transition ${
                selectedActId === act.id
                  ? 'bg-[#006a4e] text-white border-[#006a4e] shadow-sm'
                  : 'bg-white border-stone-200 hover:border-stone-300 text-[#1a2f23]'
              }`}
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-75">
                {act.actNo}
              </div>
              <div className="font-serif font-bold text-sm mt-1 leading-snug truncate">{act.titleEn}</div>
              <div className="text-[11px] opacity-80 mt-1 truncate">{act.titleBn}</div>
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by section number, English title, or বাংলা keywords..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#faf8f5] border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#006a4e]"
            />
          </div>
          <div className="text-xs text-stone-500 whitespace-nowrap">
            Showing <strong>{filteredSections.length}</strong> statutory sections
          </div>
        </div>

        {/* 2-Column Split: Section List & Section Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Section Navigation List */}
          <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredSections.map((sec, idx) => {
              const isSelected = selectedSection?.sectionNo === sec.sectionNo && selectedSection?.actTitle === sec.actTitle;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSection(sec)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#006a4e] shadow ring-1 ring-[#006a4e]'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-[#006a4e] bg-[#006a4e]/10 px-2 py-0.5 rounded">
                      {sec.sectionNo}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">{sec.actTitle}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1a2f23] mt-1 leading-snug">
                    {sec.titleEn}
                  </h4>
                  <p className="text-xs text-[#006a4e] mt-0.5">{sec.titleBn}</p>
                </div>
              );
            })}

            {filteredSections.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
                No statutory sections found matching your query.
              </div>
            )}
          </div>

          {/* Section Inspector Details */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm sticky top-4">
            {selectedSection ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <span className="font-mono font-bold text-[#006a4e] bg-[#006a4e]/10 px-2.5 py-1 rounded text-xs">
                      {selectedSection.sectionNo}
                    </span>
                    <span className="text-xs font-semibold text-stone-500 ml-2">
                      {selectedSection.actTitle}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCitation(selectedSection)}
                    className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200"
                  >
                    {copiedNo === selectedSection.sectionNo ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#006a4e]" /> Citation Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Official Citation
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#1a2f23] leading-snug">
                    {selectedSection.titleEn}
                  </h3>
                  <h4 className="text-sm font-semibold text-[#006a4e] mt-1">{selectedSection.titleBn}</h4>
                  <p className="text-xs text-stone-400 mt-1">{selectedSection.chapter}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf8f5] border border-stone-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Statutory Rule & Plain English Interpretation
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a2f23] leading-relaxed">
                    {selectedSection.summary}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1a2f23] mb-2">
                    Key Legal Principles & Conditions
                  </div>
                  <ul className="space-y-2">
                    {selectedSection.keyPoints.map((kp, kidx) => (
                      <li key={kidx} className="text-xs text-stone-700 flex items-start gap-2">
                        <FileCheck2 className="w-4 h-4 text-[#006a4e] shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/research?q=${encodeURIComponent(selectedSection.titleEn)}`}
                    className="bg-[#006a4e] hover:bg-[#00523c] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition"
                  >
                    Query In Research Engine
                  </Link>
                  <a
                    href="http://bdlaws.minlaw.gov.bd/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-stone-500 hover:text-black flex items-center gap-1"
                  >
                    Check Gazette at Bangladesh Code <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-stone-400 text-xs">
                Select a statutory section from the list to view legal provisions.
              </div>
            )}
          </div>
        </div>
      </div>
    </Workspace>
  );
}
