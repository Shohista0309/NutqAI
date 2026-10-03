'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Mic,
  Sparkles,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  AlertTriangle,
  Award,
  Zap,
  CheckCircle2,
  Play,
  Activity,
} from 'lucide-react';
import { getUserProfile, getAllSessions } from '@/lib/db/storage';
import { UserProfile, SpeechAnalysisResult } from '@/types';

export default function DashboardOverviewPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<SpeechAnalysisResult[]>([]);

  useEffect(() => {
    setUser(getUserProfile());
    setSessions(getAllSessions());
  }, []);

  const latestSession = sessions[0];
  const overallScore = latestSession ? latestSession.scores.overall : 84;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>BUGUNGI MASHG'ULOT TAYYOR</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Xush kelibsiz, <span className="gradient-text">{user?.name || 'Jasur Bek'}</span>!
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Bugungi 15 daqiqalik mashg'ulotingiz: <strong className="text-white">"Filler so'zlarni kamaytirish va pauza qilish"</strong>.
            </p>
          </div>

          <Link
            href="/dashboard/speak"
            className="px-8 py-4 rounded-2xl gradient-button text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shrink-0 group"
          >
            <Mic className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />
            <span>MASHQNI BOSHLASH</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Grid: Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Speech Score Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300">Nutq Score</h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +6% Haftalik
            </span>
          </div>

          <div className="flex items-center gap-6 my-2">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500"
                  strokeDasharray={`${overallScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-2xl font-extrabold font-display text-white">
                {overallScore}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Ravonlik: <strong>{latestSession?.scores.fluency || 82}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Talaffuz: <strong>{latestSession?.scores.pronunciation || 78}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Fillerlar: <strong>{latestSession?.scores.fillers || 65}</strong></span>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">So'nggi mashg'ulot tahlili asosida</span>
        </div>

        {/* Weekly Progress Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300">Haftalik Progress</h3>
            <span className="text-xs text-indigo-400 font-semibold">148 WPM avg</span>
          </div>

          {/* Simple Simulated Bar Chart */}
          <div className="h-28 flex items-end justify-between gap-2 px-2 my-2">
            {[
              { day: 'Dush', h: 55 },
              { day: 'Sesh', h: 65 },
              { day: 'Chor', h: 72 },
              { day: 'Pay', h: 60 },
              { day: 'Jum', h: 84 },
              { day: 'Shan', h: 90 },
              { day: 'Yak', h: 82 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-lg transition-all"
                  style={{ height: `${bar.h}%` }}
                />
                <span className="text-[10px] text-slate-500 font-medium">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex justify-between">
            <span>Ushbu hafta: <strong>5 ta mashg'ulot</strong></span>
            <span className="text-emerald-400 font-semibold">Maqsad bajarildi</span>
          </div>
        </div>

        {/* Streak & Achievements Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between bg-gradient-to-br from-amber-950/20 to-slate-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-300">Ketma-ket kunlar</h3>
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
          </div>

          <div className="my-2">
            <div className="text-4xl font-extrabold font-display text-amber-400">
              {user?.streak || 5} Kun!
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Har kuni mashq qiling va keyingi "Master Notiq" nishonini qo'lga kiriting.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
            <Award className="w-6 h-6 text-indigo-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Keyingi daraja: Professional</span>
              <span className="text-slate-400">Yana 550 XP kerak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Recommendation Banner */}
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-900/30 to-slate-900 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-400 shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Bugungi AI Murabbiy Tavsiyasi</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            "So'nggi nutqingizda <strong>'demak'</strong> so'zi 8 marta ishlatilgan. Bugungi mashqda har bir gap yakunida 1 soniyalik sukunat saqlashga harakat qiling."
          </p>
        </div>
      </div>

      {/* Recent Speech Analyses */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white">So'nggi Tahlillar</h3>
            <p className="text-xs text-slate-400">Yozib olingan va AI tomonidan tahlil qilingan nutqlar</p>
          </div>
          <Link
            href="/dashboard/history"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Barchasini ko'rish →
          </Link>
        </div>

        <div className="space-y-3">
          {sessions.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                  {item.scores.overall}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{item.durationSeconds} sek</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-semibold">{item.wpm} WPM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between">
                <div className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {item.totalFillersCount} ta filler
                </div>
                <Link
                  href={`/dashboard/analysis/${item.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Tahlilni ochish
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
