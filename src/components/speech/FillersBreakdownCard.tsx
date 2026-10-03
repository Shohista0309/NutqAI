'use client';

import React from 'react';
import { UzbekFillerWord } from '@/types';
import { AlertCircle, Clock, Search } from 'lucide-react';

interface FillersBreakdownCardProps {
  fillers: UzbekFillerWord[];
  totalFillersCount: number;
}

export default function FillersBreakdownCard({
  fillers,
  totalFillersCount,
}: FillersBreakdownCardProps) {
  return (
    <div className="w-full glass-card p-6 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <span>Filler so'zlar tahlili</span>
          </h3>
          <p className="text-xs text-slate-400">
            Aniqlangan keraksiz takroriy va parazit so'zlar
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          Jami: {totalFillersCount} ta
        </div>
      </div>

      {fillers.length === 0 ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-300 text-sm font-semibold">
          A'lo! Nutqingizda birorta ham filler so'z aniqlanmadi.
        </div>
      ) : (
        <div className="space-y-3">
          {fillers.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold font-mono text-xs">
                  "{item.word}"
                </div>
                <span className="text-slate-300 font-semibold">{item.count} marta ishlatildi</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Vaqtlar: {item.timestamps.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
