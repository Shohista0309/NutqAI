'use client';

import React, { useState, useEffect } from 'react';
import { generate7DayPlan, getUserProfile } from '@/lib/db/storage';
import { PlanDay } from '@/types';
import { CalendarCheck, CheckCircle2, Lock, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PlanPage() {
  const [plan, setPlan] = useState<PlanDay[]>([]);

  useEffect(() => {
    const user = getUserProfile();
    setPlan(generate7DayPlan(user.goal, user.mainIssue));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>SHAXSIY MASHG'ULOT DASTURI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          7 Kunlik Individual Plan
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          AI tomonidan zaif nuqtalaringizni bartaraf etish uchun shakllantirilgan kunlik mashqlar seriyasi.
        </p>
      </div>

      {/* Plan Days List */}
      <div className="space-y-4">
        {plan.map((day) => {
          let statusBadge = 'bg-slate-800 text-slate-400 border-slate-700';
          let statusIcon = Lock;

          if (day.status === 'completed') {
            statusBadge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            statusIcon = CheckCircle2;
          } else if (day.status === 'current') {
            statusBadge = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 animate-pulse';
            statusIcon = Sparkles;
          }

          const StatusIcon = statusIcon;

          return (
            <div
              key={day.dayNumber}
              className={`glass-card p-6 rounded-3xl border transition-all ${
                day.status === 'current'
                  ? 'border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 to-slate-900'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${statusBadge}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{day.title}</h3>
                    <p className="text-xs text-slate-400">{day.focus}</p>
                  </div>
                </div>

                {day.status === 'current' ? (
                  <Link
                    href="/dashboard/speak"
                    className="px-5 py-2.5 rounded-xl gradient-button text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>MASHQNI BOSHLASH</span>
                  </Link>
                ) : (
                  <span className="text-xs text-slate-500 font-semibold capitalize">{day.status}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {day.exercises.map((ex) => (
                  <div key={ex.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
                    <div className="font-bold text-slate-200 mb-1">{ex.title}</div>
                    <div className="text-slate-400">{ex.description}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
