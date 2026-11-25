'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Scale,
  Send,
  Sparkles,
  BookOpen,
  FolderPlus,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Workspace } from '@/components/Layout/Workspace';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ act: string; section: string; snippet: string }>;
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  {
    en: 'What are the legal conditions to claim damages for breach of contract?',
    bn: 'চুক্তি ভঙ্গের দরুন ক্ষতিপূরণ দাবি করার আইনি শর্ত কী কী?',
  },
  {
    en: 'What is the statutory notice period for termination of employment?',
    bn: 'চাকরি অবসান বা ছাঁটাইয়ের ক্ষেত্রে নোটিশের আইনি সময়সীমা কত?',
  },
  {
    en: 'Can a director be held liable for debts of a limited company?',
    bn: 'লিমিটেড কোম্পানির দেনার জন্য কি পরিচালক ব্যক্তিগতভাবে দায়ী হতে পারেন?',
  },
  {
    en: 'What constitutes grounds for dissolution of a partnership firm by Court?',
    bn: 'আদালত কর্তৃক অংশীদারি প্রতিষ্ঠান বিলোপের কারণগুলো কী কী?',
  },
];

export default function AiChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Welcome to the Bangladesh Legal Intelligence Assistant. I provide assistive legal research across Corporate/Company Law, Commercial & Contract Law, Partnership Law, and Labour Law. Every statement is grounded in our curated statutory corpus.',
      timestamp: 'Just now',
      citations: [
        {
          act: 'Contract Act, 1872',
          section: 'Section 73',
          snippet: 'Compensation for loss or damage caused by breach of contract.',
        },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Context-grounded simulated response reflecting SRS retrieval requirements
    setTimeout(() => {
      let reply = '';
      let cites: ChatMessage['citations'] = [];

      const lower = q.toLowerCase();
      if (lower.includes('contract') || lower.includes('breach') || lower.includes('damage') || lower.includes('চুক্তি')) {
        reply =
          'Under the Contract Act 1872 (Section 73), a party suffering from a contractual breach is entitled to compensation for direct loss or damage naturally arising in the usual course of things. If pre-estimated liquidated damages are specified in the agreement, Section 74 provides that the court may award reasonable compensation not exceeding that stipulated amount.';
        cites = [
          {
            act: 'The Contract Act, 1872',
            section: 'Section 73',
            snippet: 'Compensation for loss or damage naturally arising in the usual course.',
          },
          {
            act: 'The Contract Act, 1872',
            section: 'Section 74',
            snippet: 'Compensation where penalty or liquidated sum is stipulated.',
          },
        ];
      } else if (lower.includes('labour') || lower.includes('wage') || lower.includes('notice') || lower.includes('ছাঁটাই')) {
        reply =
          'Under Section 26 of the Bangladesh Labour Act 2006, termination of a permanent worker requires 120 days written notice for monthly-rated workers (or payment of wages in lieu thereof). Furthermore, under Section 52, a worker completing continuous service of at least one year is entitled to gratuity calculated at 30 days basic wages per completed year of service.';
        cites = [
          {
            act: 'The Bangladesh Labour Act, 2006',
            section: 'Section 26',
            snippet: 'Written notice requirements and wages in lieu of notice for permanent workers.',
          },
          {
            act: 'The Bangladesh Labour Act, 2006',
            section: 'Section 52',
            snippet: 'Gratuity calculation based on completed years of continuous service.',
          },
        ];
      } else if (lower.includes('director') || lower.includes('company') || lower.includes('কোম্পানি')) {
        reply =
          'Under the Companies Act 1994, a company is an independent legal entity with limited liability. Directors owe a strict fiduciary duty under Section 104 to act in good faith in the best commercial interest of the company. A director cannot be held personally liable for legitimate corporate debts unless fraud, misfeasance, or personal guarantees are established.';
        cites = [
          {
            act: 'The Companies Act, 1994',
            section: 'Section 85',
            snippet: 'Mandatory convening of Annual General Meetings within 15 months.',
          },
          {
            act: 'The Companies Act, 1994',
            section: 'Section 104',
            snippet: 'Director fiduciary obligations, disclosure of interest, and accountability.',
          },
        ];
      } else {
        reply =
          'Based on statutory principles in the Bangladesh legal corpus, obligations and dispute resolutions must be interpreted in light of the governing act. For commercial disputes, please refer to the Contract Act 1872; for corporate governance, refer to the Companies Act 1994; and for service relationships, refer to the Labour Act 2006.';
        cites = [
          {
            act: 'The Partnership Act, 1932',
            section: 'Section 13',
            snippet: 'Mutual rights, fiduciary participation, and joint liabilities of partners.',
          },
        ];
      }

      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: cites,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <Workspace title="AI Legal Research Assistant">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
        {/* Compliance Header Banner */}
        <div className="p-3 mb-4 rounded-xl bg-[#006a4e]/10 border border-[#006a4e]/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#006a4e] font-semibold">
            <ShieldAlert className="w-4 h-4 text-[#006a4e] shrink-0" />
            <span>
              Assisted Legal Research · All outputs are assistive drafts subject to professional advocate review.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-500 text-[11px]">Language:</span>
            <button
              onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
              className="px-2 py-0.5 rounded bg-white border border-stone-300 font-bold text-[10px] text-[#006a4e]"
            >
              {language === 'EN' ? 'English (EN)' : 'বাংলা (BN)'}
            </button>
          </div>
        </div>

        {/* Chat Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-[#006a4e] text-white rounded-br-none'
                    : 'bg-white border border-stone-200 text-[#1a2f23] rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1.5 opacity-70 text-[10px]">
                  <span className="font-bold uppercase tracking-wider">
                    {m.role === 'user' ? 'Advocate / Researcher' : 'Legal Intelligence Engine'}
                  </span>
                  <span>{m.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap">{m.content}</div>

                {/* Citations Box for Assistant Responses */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#006a4e] block">
                      Retrieved Authorities & Sections
                    </span>
                    {m.citations.map((c, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-[#faf8f5] border border-stone-200 text-xs flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between font-bold text-[#006a4e]">
                          <span>
                            {c.act} · {c.section}
                          </span>
                          <Link
                            href={`/acts?q=${encodeURIComponent(c.section)}`}
                            className="text-[10px] text-stone-500 hover:text-black flex items-center gap-0.5"
                          >
                            Open Statute <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                        <p className="text-[11px] text-stone-600">{c.snippet}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {m.role === 'assistant' && (
                <div className="flex items-center gap-2 mt-1.5 ml-2 text-[11px] text-stone-500">
                  <button
                    onClick={() => handleCopy(m.id, m.content)}
                    className="hover:text-black flex items-center gap-1"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3 h-3 text-[#006a4e]" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                  <span>·</span>
                  <Link href="/matters" className="hover:text-[#006a4e] flex items-center gap-1">
                    <FolderPlus className="w-3 h-3" /> Save to Case Matter
                  </Link>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-stone-500 p-2 bg-white rounded-xl w-fit border border-stone-200">
              <Sparkles className="w-3.5 h-3.5 text-[#006a4e] animate-pulse" />
              <span>Analyzing statutory provisions...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="py-2 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[10px] font-bold uppercase text-stone-400 shrink-0">Suggestions:</span>
          {SAMPLE_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(language === 'EN' ? p.en : p.bn)}
              className="bg-white border border-stone-200 hover:border-[#006a4e] text-stone-700 px-3 py-1.5 rounded-full whitespace-nowrap text-xs transition shadow-sm"
            >
              {language === 'EN' ? p.en : p.bn}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="p-2 bg-white rounded-2xl border border-stone-300 shadow-sm flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'EN'
                ? 'Ask a legal research query in English or Bangla...'
                : 'আইনি গবেষণার প্রশ্ন বাংলায় বা ইংরেজিতে লিখুন...'
            }
            className="flex-1 px-3 py-2 text-xs sm:text-sm text-[#1a2f23] focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="bg-[#006a4e] hover:bg-[#00523c] disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow flex items-center justify-center"
            aria-label="Send legal query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Workspace>
  );
}
