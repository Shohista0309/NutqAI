'use client';

import React from 'react';
import { TrendingUp, Award, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ProgressPage() {
  const comparisonMatrix = [
    { metric: 'Overall Speech Score', week1: '68 / 100', week4: '88 / 100', change: '+29%' },
    { metric: 'Filler so\'zlar soni (1 daqiqada)', week1: '12 ta', week4: '2 ta', change: '-83%' },
    { metric: 'Nutq tezligi (WPM)', week1: '188 WPM (Juda tez)', week4: '148 WPM (Optimal)', change: 'Me\'yorida' },
    { metric: 'Ravonlik (Fluency)', week1: '62 / 100', week4: '91 / 100', change: '+46%' },
    { metric: 'Pauzalarni to\'g\'ri qo\'llash', week1: '54 / 100', week4: '84 / 100', change: '+55%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>RIVOJLANISH TAQDOSHLAMA TAHLILI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Progress & Tarixiy Dinamika
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Dastlabki va hozirgi nutq ko'rsatkichlaringizni taqqoslang hamda statistik o'sishni kuzating.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800">
        <h3 className="font-display font-bold text-lg text-white mb-6">
          "1-Hafta vs 4-Hafta" Taqqoslash Matritsasi
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase font-bold">
                <th className="pb-3">Nutq Ko'rsatkichi</th>
                <th className="pb-3">1-Hafta (Boshlang'ich)</th>
                <th className="pb-3">4-Hafta (Hozirgi)</th>
                <th className="pb-3">O'sish Dinamikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 font-semibold text-slate-200">{item.metric}</td>
                  <td className="py-4 text-slate-400">{item.week1}</td>
                  <td className="py-4 font-bold text-indigo-400">{item.week4}</td>
                  <td className="py-4 font-bold text-emerald-400">{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
