'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAllSessions } from '@/lib/db/storage';
import { SpeechAnalysisResult } from '@/types';
import ScoreRadar from '@/components/speech/ScoreRadar';
import FeedbackList from '@/components/speech/FeedbackList';
import FillersBreakdownCard from '@/components/speech/FillersBreakdownCard';
import { ArrowLeft, Sparkles, Volume2, Share2, Download } from 'lucide-react';
import Link from 'next/link';

export default function DetailedAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<SpeechAnalysisResult | null>(null);

  useEffect(() => {
    const sessions = getAllSessions();
    const found = sessions.find((s) => s.id === params.id) || sessions[0];
    setSession(found || null);
  }, [params.id]);

  if (!session) {
    return (
      <div className="p-8 text-center text-slate-400">
        Tahlil topilmadi. <Link href="/dashboard" className="text-indigo-400 underline">Dashboardga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </button>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 hover:text-white">
            <Share2 className="w-3.5 h-3.5" />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NUTQINGIZ TAHLIL QILINDI</span>
            </div>
            <h1 className="text-2xl font-display font-extrabold text-white">{session.title}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
              <span>{new Date(session.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>Davomiyligi: <strong>{session.durationSeconds} soniya</strong></span>
              <span>•</span>
              <span>Tezlik: <strong className="text-cyan-300">{session.wpm} WPM ({session.pacingStatus})</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="text-center">
              <div className="text-3xl font-extrabold font-display text-indigo-400">
                {session.scores.overall}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Overall Score</div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-3xl font-extrabold font-display text-amber-400">
                {session.totalFillersCount}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Filler so'z</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Box */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-indigo-400" />
          <span>Transkripsiya Matni</span>
        </h3>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed font-mono">
          "{session.transcript}"
        </div>
      </div>

      {/* Score & Fillers Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScoreRadar scores={session.scores} wpm={session.wpm} pacingStatus={session.pacingStatus} />
        <FillersBreakdownCard fillers={session.fillers} totalFillersCount={session.totalFillersCount} />
      </div>

      {/* AI Feedback List */}
      <FeedbackList feedbackList={session.feedbackList} />
    </div>
  );
}
