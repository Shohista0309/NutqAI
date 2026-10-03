'use client';

import React from 'react';
import { AIFeedbackItem } from '@/types';
import { AlertCircle, AlertTriangle, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

interface FeedbackListProps {
  feedbackList: AIFeedbackItem[];
}

export default function FeedbackList({ feedbackList }: FeedbackListProps) {
  return (
    <div className="w-full glass-card p-6 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>AI Murabbiy feedback va tavsiyalari</span>
          </h3>
          <p className="text-xs text-slate-400">Aniq vaqtlar, sabablar hamda amaliy tuzatishlar</p>
        </div>
      </div>

      <div className="space-y-4">
        {feedbackList.map((item) => {
          let badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
          let Icon = AlertTriangle;

          if (item.severity === 'high') {
            badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
            Icon = AlertCircle;
          } else if (item.severity === 'success') {
            badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            Icon = CheckCircle;
          }

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${badgeColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.issue}</h4>
                    {item.timestampRange && (
                      <span className="text-[11px] text-slate-400">Vaqt: {item.timestampRange}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Cause & Example */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Sababi:</span>
                  <span className="text-slate-300">{item.cause}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Misol:</span>
                  <span className="text-slate-300 italic">{item.example}</span>
                </div>
              </div>

              {/* Fix & Recommended Exercise */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs pt-1">
                <div className="text-emerald-300 font-medium">
                  <span className="text-slate-400 font-semibold">Tavsiya etiladigan tuzatish: </span>
                  {item.fix}
                </div>

                <Link
                  href="/dashboard/speak"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>{item.nextExercise}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
