'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  Flag,
  FileText,
  Scale,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Workspace } from '@/components/Layout/Workspace';

interface ValidationItem {
  id: string;
  query: string;
  claim: string;
  citation: string;
  actTitle: string;
  sourcePassage: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  reviewerComment?: string;
  timestamp: string;
}

const INITIAL_QUEUE: ValidationItem[] = [
  {
    id: 'val-01',
    query: 'What is the compensation for direct breach of commercial contract?',
    claim: 'A party suffering from breach of contract is entitled to compensation for direct damages naturally arising from the breach.',
    citation: 'Contract Act 1872 · Section 73',
    actTitle: 'The Contract Act, 1872',
    sourcePassage: 'When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach, or which the parties knew, when they made the contract, to be likely to result from the breach of it.',
    status: 'Verified',
    timestamp: '10 mins ago',
  },
  {
    id: 'val-02',
    query: 'Statutory overtime wage calculation for garment factory workers in industrial zones.',
    claim: 'Overtime work is remunerated at twice the ordinary rate of basic wage and dearness allowances.',
    citation: 'Bangladesh Labour Act 2006 · Section 108',
    actTitle: 'The Bangladesh Labour Act, 2006',
    sourcePassage: 'Where a worker works in any establishment on any day for more than the hours of work fixed under this Act, he shall, in respect of the overtime work, be entitled to wages at the rate of twice his ordinary rate of basic wage and dearness allowance and ad-hoc or interim pay, if any.',
    status: 'Pending',
    timestamp: '25 mins ago',
  },
  {
    id: 'val-03',
    query: 'Can a shareholder bring an action against directors for ultra vires transactions?',
    claim: 'Directors must act bona fide in the company interest, and improper secret profit makes them personally accountable.',
    citation: 'Companies Act 1994 · Section 104',
    actTitle: 'The Companies Act, 1994',
    sourcePassage: 'Directors stand in fiduciary capacity to the company and are bound to disclose conflicting personal interests in contracts entered into by the company.',
    status: 'Pending',
    timestamp: '1 hour ago',
  },
  {
    id: 'val-04',
    query: 'Notice period required for sudden factory retrenchment of permanent staff.',
    claim: 'One month notice or wages in lieu thereof is required for retrenchment of permanent workers after 1 year service.',
    citation: 'Bangladesh Labour Act 2006 · Section 20',
    actTitle: 'The Bangladesh Labour Act, 2006',
    sourcePassage: 'No worker who has been in continuous service for not less than one year under an employer shall be retrenched unless he has been given one month notice in writing indicating the reasons for retrenchment or wages in lieu of notice.',
    status: 'Flagged',
    reviewerComment: 'Check alignment with Section 26 which prescribes 120 days for ordinary termination.',
    timestamp: 'Yesterday',
  },
];

export default function ValidationPage() {
  const [items, setItems] = useState<ValidationItem[]>(INITIAL_QUEUE);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_QUEUE[0].id);
  const [filter, setFilter] = useState<'all' | 'Verified' | 'Pending' | 'Flagged'>('all');
  const [commentText, setCommentText] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const activeItem = items.find((i) => i.id === selectedId) || items[0];

  const handleMarkStatus = (status: 'Verified' | 'Flagged') => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedId
          ? {
              ...it,
              status,
              reviewerComment: status === 'Flagged' ? commentText || 'Flagged for further statutory review.' : undefined,
            }
          : it
      )
    );
    setShowCommentBox(false);
    setCommentText('');
  };

  const filteredItems = items.filter((it) => (filter === 'all' ? true : it.status === filter));

  return (
    <Workspace title="Expert Citation Review & Verification Panel">
      <div className="space-y-6">
        {/* Verification Standards Notice */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#006a4e]/10 text-[#006a4e] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1a2f23]">
                Human-in-the-Loop Citation Assurance (SRS MOD-08)
              </h3>
              <p className="text-xs text-stone-500">
                Inspect AI-generated claims against retrieved statutory passages to prevent hallucinations.
              </p>
            </div>
          </div>
          <div className="flex gap-1.5 bg-stone-100 p-1 rounded-lg text-xs font-semibold">
            {(['all', 'Pending', 'Verified', 'Flagged'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1 rounded-md transition ${
                  filter === st ? 'bg-white text-[#1a2f23] shadow-sm font-bold' : 'text-stone-500'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Queue List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-white border-[#006a4e] shadow ring-1 ring-[#006a4e]'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Verified'
                          ? 'bg-[#006a4e]/10 text-[#006a4e]'
                          : item.status === 'Flagged'
                          ? 'bg-[#f42a41]/10 text-[#f42a41]'
                          : 'bg-[#f9a825]/15 text-[#b07410]'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[11px] text-stone-400">{item.timestamp}</span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-[#1a2f23] leading-snug">{item.query}</h4>
                  <p className="text-xs text-stone-500 mt-1 font-mono">{item.citation}</p>
                </div>
              );
            })}
          </div>

          {/* Verification Workspace */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                User Legal Research Query
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1a2f23] mt-1">{activeItem.query}</h3>
            </div>

            {/* AI Generated Claim */}
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                AI Extracted Proposition / Claim
              </span>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                "{activeItem.claim}"
              </p>
            </div>

            {/* Official Source Passage */}
            <div className="p-4 rounded-xl bg-[#faf8f5] border border-stone-300/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006a4e]">
                  Ingested Statutory Source Passage
                </span>
                <span className="font-mono font-bold text-[#006a4e]">{activeItem.citation}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed italic">
                "{activeItem.sourcePassage}"
              </p>
            </div>

            {activeItem.reviewerComment && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800">
                <strong>Reviewer Note:</strong> {activeItem.reviewerComment}
              </div>
            )}

            {/* Advocate Review Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkStatus('Verified')}
                  className="bg-[#006a4e] hover:bg-[#00523c] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve as Verified
                </button>
                <button
                  onClick={() => setShowCommentBox(!showCommentBox)}
                  className="bg-white hover:bg-stone-50 text-[#f42a41] border border-stone-300 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Flag className="w-4 h-4" /> Flag Inconsistency
                </button>
              </div>

              <Link
                href={`/acts?q=${encodeURIComponent(activeItem.citation)}`}
                className="text-xs text-stone-500 hover:text-black flex items-center gap-1"
              >
                Inspect Full Statute <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {showCommentBox && (
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  Correction Note / Reason for Flagging:
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Specify statutory mismatch, outdated amendment, or interpretation issue..."
                  className="w-full bg-[#faf8f5] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#f42a41]"
                  rows={3}
                />
                <button
                  onClick={() => handleMarkStatus('Flagged')}
                  className="bg-[#f42a41] hover:bg-[#d61e34] text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition"
                >
                  Confirm Flag
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Workspace>
  );
}
