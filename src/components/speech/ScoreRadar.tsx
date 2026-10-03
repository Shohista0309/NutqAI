'use client';

import React from 'react';
import { SpeechScores } from '@/types';
import { CheckCircle2, AlertTriangle, Zap, Volume2, Shield, Brain, Gauge } from 'lucide-react';

interface ScoreRadarProps {
  scores: SpeechScores;
  wpm: number;
  pacingStatus: string;
}

export default function ScoreRadar({ scores, wpm, pacingStatus }: ScoreRadarProps) {
  const scoreItems = [
    { key: 'fluency', label: 'Ravonlik', score: scores.fluency, icon: Zap, color: 'from-indigo-500 to-indigo-600' },
    { key: 'pronunciation', label: 'Talaffuz', score: scores.pronunciation, icon: Volume2, color: 'from-cyan-500 to-cyan-600' },
    { key: 'speed', label: 'Tezlik', score: scores.speed, icon: Gauge, color: 'from-emerald-500 to-emerald-600' },
    { key: 'pause', label: 'Pauza', score: scores.pause, icon: CheckCircle2, color: 'from-blue-500 to-blue-600' },
    { key: 'fillers', label: 'Filler so\'zlar', score: scores.fillers, icon: AlertTriangle, color: 'from-amber-500 to-amber-600' },
    { key: 'logic', label: 'Mantiqiylik', score: scores.logic, icon: Brain, color: 'from-purple-500 to-purple-600' },
    { key: 'confidence', label: 'Ishonchlilik', score: scores.confidence, icon: Shield, color: 'from-rose-500 to-rose-600' },
  ];

  return (
    <div className="w-full glass-card p-6 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Nutq Score Komponentlari</h3>
          <p className="text-xs text-slate-400">Har bir ko'rsatkich bo'yicha sun'iy intellekt bahosi</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-indigo-400 font-display">{scores.overall}</div>
          <div className="text-[10px] uppercase font-bold text-slate-500">Umumiy Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scoreItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.score} / 100</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} transition-all duration-700 rounded-full`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
