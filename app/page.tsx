'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Search,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  FolderOpen,
  ArrowRight,
  FileText,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { LEGAL_ACTS, FEATURED_SECTIONS } from '@/lib/bdLegalCorpus';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'company' | 'contract' | 'labour'>('all');
  const [selectedCalc, setSelectedCalc] = useState<'contract' | 'labour' | 'company'>('contract');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  // Quick checker state
  const [claimAmount, setClaimAmount] = useState('500000');
  const [serviceYears, setServiceYears] = useState('4');
  const [basicWage, setBasicWage] = useState('22000');

  const runCalculator = () => {
    if (selectedCalc === 'contract') {
      const amt = Number(claimAmount) || 0;
      setCalcResult(
        `Under Section 73 & 74 of the Contract Act 1872, direct loss must be substantiated with documentary proof. Pre-estimated liquidated damages of BDT ${amt.toLocaleString()} represent an upper ceiling; the court evaluates fair and reasonable damages.`
      );
    } else if (selectedCalc === 'labour') {
      const wage = Number(basicWage) || 0;
      const years = Number(serviceYears) || 0;
      const gratuity = years * wage;
      setCalcResult(
        `Under Section 52 of Bangladesh Labour Act 2006, gratuity is payable at 30 days basic wage per completed year. Estimated Gratuity entitlement for ${years} years: BDT ${gratuity.toLocaleString()} (plus notice period compensation if terminated under Section 26).`
      );
    } else {
      setCalcResult(
        'Under Companies Act 1994 (Section 85 & 104), statutory quorum requires presence of designated directors. Director liability is limited by shares except in cases of breach of fiduciary trust or misfeasance.'
      );
    }
  };

  const filteredSections = FEATURED_SECTIONS.filter((s) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'company') return s.actTitle.includes('Companies');
    if (activeTab === 'contract') return s.actTitle.includes('Contract');
    if (activeTab === 'labour') return s.actTitle.includes('Labour');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a2f23] font-sans selection:bg-[#006a4e] selection:text-white">
      {/* Top Legal Authority & Emergency Bar */}
      <div className="bg-[#1a2f23] text-stone-200 border-b border-[#006a4e]/40 px-4 md:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#006a4e] text-white font-semibold text-[11px] uppercase tracking-wider">
              <Scale className="w-3 h-3" /> Bangladesh Legal Intelligence
            </span>
            <span className="hidden sm:inline text-stone-300">
              Curated statutory corpus aligned with Ministry of Law & Supreme Court
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-stone-300">
              Labour Helpline: <strong className="text-[#f9a825]">16357</strong>
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="text-stone-300">
              National Aid: <strong className="text-[#f42a41]">999</strong>
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="text-stone-300">
              BLAST Legal Trust: <strong>02-8391970</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation */}
      <nav className="bg-[#006a4e] border-b-4 border-[#f42a41] px-4 md:px-8 py-3.5 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-white no-underline group">
            <div className="w-10 h-10 bg-[#f42a41] rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif italic font-bold text-xl md:text-2xl text-white tracking-tight">
                LegalInfo BD
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#f9a825] font-semibold -mt-1">
                AI Legal Intelligence Platform
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/ai-chat"
              className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              AI Assistant
            </Link>
            <Link
              href="/acts"
              className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              BD Acts & Statutes
            </Link>
            <Link
              href="/matters"
              className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              Case Matters
            </Link>
            <Link
              href="/documents"
              className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              Document Intake
            </Link>
            <Link
              href="/validation"
              className="px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              Validation Panel
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/ai-chat"
              className="bg-[#f9a825] hover:bg-[#e5981f] text-[#1a2f23] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full transition shadow hover:shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Research</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-[#f2ece4] to-[#faf8f5] border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006a4e]/10 border border-[#006a4e]/20 text-[#006a4e] font-semibold text-xs mb-6">
            <ShieldCheck className="w-4 h-4 text-[#006a4e]" />
            Verified Statutory Retrieval · Companies · Contract · Partnership · Labour Law
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1a2f23] leading-tight">
            AI-Powered Legal Research & <br />
            <span className="text-[#006a4e]">Document Intelligence</span> for Bangladesh
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Connecting case document intake, fact extraction, and statutory authority retrieval into one verifiable
            lawyer workspace. Every AI statement is anchored to official legislation with verifiable citations.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ai-chat"
              className="bg-[#006a4e] hover:bg-[#00523c] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Start AI Legal Query
            </Link>
            <Link
              href="/documents"
              className="bg-white hover:bg-stone-50 text-[#1a2f23] border border-stone-300 font-bold text-sm px-6 py-3.5 rounded-xl shadow-sm transition flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4 text-[#006a4e]" /> Upload Case Document
            </Link>
            <Link
              href="/acts"
              className="bg-[#f42a41] hover:bg-[#d61e34] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Browse Statutory Acts
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-stone-300/70">
            <div className="p-4 bg-white/70 backdrop-blur rounded-xl border border-stone-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#006a4e]">1,000+</div>
              <div className="text-xs font-semibold text-stone-600 mt-1 uppercase tracking-wider">
                Statutory Sections
              </div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur rounded-xl border border-stone-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#f42a41]">4 Core</div>
              <div className="text-xs font-semibold text-stone-600 mt-1 uppercase tracking-wider">
                Bangladesh Acts
              </div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur rounded-xl border border-stone-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#1a2f23]">95%+</div>
              <div className="text-xs font-semibold text-stone-600 mt-1 uppercase tracking-wider">
                Citation Precision Target
              </div>
            </div>
            <div className="p-4 bg-white/70 backdrop-blur rounded-xl border border-stone-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#006a4e]">OCR & PDF</div>
              <div className="text-xs font-semibold text-stone-600 mt-1 uppercase tracking-wider">
                Document Intelligence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Legal Acts Grid */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#006a4e]">
              Curated Knowledge Base
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1a2f23] mt-1">
              Primary Statutory Foundations
            </h2>
          </div>
          <Link
            href="/acts"
            className="text-xs font-bold uppercase tracking-wider text-[#006a4e] hover:text-[#00523c] flex items-center gap-1"
          >
            Explore Full Act Index <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEGAL_ACTS.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-mono font-bold text-[#f42a41]">{act.actNo}</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {act.year}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1a2f23] leading-snug">
                  {act.titleEn}
                </h3>
                <p className="text-sm font-semibold text-[#006a4e] mt-1">{act.titleBn}</p>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed">{act.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500">
                  {act.totalSections} statutory sections
                </span>
                <Link
                  href={`/acts?act=${act.id}`}
                  className="text-xs font-bold text-[#006a4e] hover:text-[#004f38] flex items-center gap-1"
                >
                  Browse <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Legal Calculator & Query Checker */}
      <section className="bg-white border-y border-stone-200 px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f42a41]">
              Assistive Tools
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1a2f23] mt-1">
              Interactive Legal Provision Checker
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-2">
              Select a domain rule to verify statutory entitlements, thresholds, or liability factors based on
              Bangladesh law.
            </p>
          </div>

          <div className="bg-[#faf8f5] rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 pb-4">
              <button
                onClick={() => {
                  setSelectedCalc('contract');
                  setCalcResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  selectedCalc === 'contract'
                    ? 'bg-[#006a4e] text-white shadow'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                Contract Breach & Damages (§73-74)
              </button>
              <button
                onClick={() => {
                  setSelectedCalc('labour');
                  setCalcResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  selectedCalc === 'labour'
                    ? 'bg-[#006a4e] text-white shadow'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                Labour Gratuity & Notice (§26, §52)
              </button>
              <button
                onClick={() => {
                  setSelectedCalc('company');
                  setCalcResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  selectedCalc === 'company'
                    ? 'bg-[#006a4e] text-white shadow'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                Company AGM & Director Liability (§85, §104)
              </button>
            </div>

            {selectedCalc === 'contract' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Stipulated Liquidated Damages (BDT)
                  </label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm text-[#1a2f23] focus:outline-none focus:ring-2 focus:ring-[#006a4e]"
                    placeholder="e.g. 500000"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Applicable to commercial agreements under Contract Act 1872
                  </p>
                </div>
                <div className="flex md:items-end">
                  <button
                    onClick={runCalculator}
                    className="w-full md:w-auto bg-[#006a4e] hover:bg-[#00523c] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition"
                  >
                    Check Statutory Rule
                  </button>
                </div>
              </div>
            )}

            {selectedCalc === 'labour' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Last Drawn Basic Wage (BDT)
                  </label>
                  <input
                    type="number"
                    value={basicWage}
                    onChange={(e) => setBasicWage(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm text-[#1a2f23] focus:outline-none focus:ring-2 focus:ring-[#006a4e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                    Completed Service (Years)
                  </label>
                  <input
                    type="number"
                    value={serviceYears}
                    onChange={(e) => setServiceYears(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm text-[#1a2f23] focus:outline-none focus:ring-2 focus:ring-[#006a4e]"
                  />
                </div>
                <div className="flex sm:items-end">
                  <button
                    onClick={runCalculator}
                    className="w-full bg-[#006a4e] hover:bg-[#00523c] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition"
                  >
                    Calculate Statutory Gratuity
                  </button>
                </div>
              </div>
            )}

            {selectedCalc === 'company' && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#1a2f23]">
                    Companies Act 1994 Governance Check
                  </h4>
                  <p className="text-xs text-stone-600">
                    Verify statutory meeting windows and mandatory board resolutions for corporate compliance.
                  </p>
                </div>
                <button
                  onClick={runCalculator}
                  className="bg-[#006a4e] hover:bg-[#00523c] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition whitespace-nowrap"
                >
                  Verify Compliance Rule
                </button>
              </div>
            )}

            {calcResult && (
              <div className="mt-6 p-4 rounded-xl bg-white border-l-4 border-[#006a4e] shadow-sm text-xs md:text-sm text-[#1a2f23] leading-relaxed">
                <div className="font-bold text-[#006a4e] uppercase tracking-wider text-[11px] mb-1">
                  Statutory Rule Summary
                </div>
                {calcResult}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Statutory Provisions with Tabs */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#006a4e]">
              Direct Authorities
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1a2f23] mt-1">
              Sample Indexed Statutory Sections
            </h2>
          </div>
          <div className="flex gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs font-semibold">
            {(['all', 'contract', 'company', 'labour'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  activeTab === tab ? 'bg-white text-[#1a2f23] shadow-sm' : 'text-stone-600 hover:text-black'
                }`}
              >
                {tab === 'all' ? 'All Domains' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:border-[#006a4e]/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-[#006a4e] bg-[#006a4e]/10 px-2.5 py-0.5 rounded">
                    {sec.sectionNo}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">{sec.actTitle}</span>
                </div>
                <h3 className="font-bold text-base text-[#1a2f23] leading-snug mt-2">{sec.titleEn}</h3>
                <p className="text-xs text-[#006a4e] font-semibold mt-1">{sec.titleBn}</p>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed">{sec.summary}</p>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Key Legal Principles
                  </span>
                  <ul className="space-y-1">
                    {sec.keyPoints.map((pt, pidx) => (
                      <li key={pidx} className="text-xs text-stone-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006a4e] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href={`/research?q=${encodeURIComponent(sec.titleEn)}`}
                  className="font-bold text-[#006a4e] hover:text-[#004f38] flex items-center gap-1"
                >
                  Run Query <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/validation"
                  className="text-stone-500 hover:text-stone-700 flex items-center gap-1"
                >
                  Inspect Citation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust, Ethical AI & Governance Banner */}
      <section className="bg-[#1a2f23] text-stone-200 px-4 md:px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-12 bg-[#006a4e] rounded-full mx-auto flex items-center justify-center mb-4">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white">
            Human-in-the-Loop Legal Assistance
          </h2>
          <p className="text-sm md:text-base text-stone-300 max-w-2xl mx-auto mt-3 leading-relaxed">
            All AI-generated memoranda, issue suggestions, and fact summaries remain drafts subject to
            professional review. The system does not fabricate statutory provisions or judicial citations and
            expressly discloses when evidence in the corpus is insufficient.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#f9a825]" /> Verified Source Anchors
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Direct traceability from every report statement back to the exact section, clause, or paragraph.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#f9a825]" /> Tenant Isolation & Privacy
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Confidential client documents are isolated per workspace and never used for model training without
                consent.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#f9a825]" /> Professional Oversight
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Advocates confirm extracted facts and suggested issues before integrated legal research proceeds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Legal Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs px-4 md:px-8 py-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <Scale className="w-5 h-5 text-[#f42a41]" /> LegalInfo BD
            </div>
            <p className="mt-1 text-stone-400 max-w-md">
              AI Legal Research & Document Intelligence Platform for Bangladesh · Prepared for IUB Innovation to
              Impact (i2i) Programme.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="http://bdlaws.minlaw.gov.bd/"
              target="_blank"
              rel="noreferrer"
              className="text-stone-300 hover:text-white flex items-center gap-1"
            >
              Bangladesh Code <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://supremecourt.gov.bd/"
              target="_blank"
              rel="noreferrer"
              className="text-stone-300 hover:text-white flex items-center gap-1"
            >
              Supreme Court of Bangladesh <ExternalLink className="w-3 h-3" />
            </a>
            <Link href="/settings" className="text-stone-300 hover:text-white">
              System Settings
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800 text-[11px] text-stone-500 text-center">
          © {new Date().getFullYear()} AI Legal Intelligence Platform. For professional legal research assistance only. Not autonomous legal representation or binding judicial opinion.
        </div>
      </footer>
    </div>
  );
}
