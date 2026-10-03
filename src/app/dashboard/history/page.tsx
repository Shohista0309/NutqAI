'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllSessions } from '@/lib/db/storage';
import { SpeechAnalysisResult } from '@/types';
import { History, Volume2, ArrowRight } from 'lucide-react';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<SpeechAnalysisResult[]>([]);

  useEffect(() => {
    setSessions(getAllSessions());
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <History className="w-3.5 h-3.5" />
          <span>TASHXIS VA OVOZ TARIXI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Barcha Yozib Olingan Nutqlar
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          O'tgan barcha mashg'ulotlaringiz, audio transkripsiyalari hamda sun'iy intellekt tahlillari.
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {sessions.map((item) => (
          <div
            key={item.id}
            className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-lg font-display">
                {item.scores.overall}
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{item.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{item.durationSeconds} sek</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-semibold">{item.wpm} WPM</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <div className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 font-semibold">
                {item.totalFillersCount} ta filler
              </div>
              <Link
                href={`/dashboard/analysis/${item.id}`}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1"
              >
                <span>Tahlilni ochish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
