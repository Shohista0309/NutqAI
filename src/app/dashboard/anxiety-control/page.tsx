'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wind, Heart, Sparkles, CheckCircle2, Play, Pause } from 'lucide-react';

export default function AnxietyControlPage() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Nafas oling (4s)' | 'Ushlab turing (7s)' | 'Sekin chiqaring (8s)'>('Nafas oling (4s)');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval: any = null;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) return prev - 1;
          // Switch phase
          if (breathPhase.startsWith('Nafas')) {
            setBreathPhase('Ushlab turing (7s)');
            return 7;
          } else if (breathPhase.startsWith('Ushlab')) {
            setBreathPhase('Sekin chiqaring (8s)');
            return 8;
          } else {
            setBreathPhase('Nafas oling (4s)');
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathPhase]);

  const prepChecklist = [
    { title: "Diafragma nafasi", desc: "Ko'krak emas, qorin bilan 3 marta chuqur nafas olib chiqaring." },
    { title: "Yelkalar va bo'yinni bo'shashtirish", desc: "Yelkalarni ketma-ket orqaga 5 marta aylantiring." },
    { title: "Ovoz naychalarini qizdirish", desc: "'M-M-M' tovushi bilan past tembrda g'ulallang." },
    { title: "Birinchi 3 ta gapni yodda tasavvur qilish", desc: "Kirish so'zingizni xotirada shakllantirib oling." },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>HAYAJON VA RUHIY TAYYORGARLIK</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Hayajonni Boshqarish Mashqlari
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Sahnaga yoki muhim taqdimotga chiqishdan oldingi 4-7-8 nafas visualizeri va performans mashqlari.
        </p>
      </div>

      {/* 4-7-8 Breathing Visualizer Card */}
      <div className="glass-card p-8 md:p-12 rounded-3xl border border-emerald-500/30 text-center relative overflow-hidden flex flex-col items-center justify-center">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6">
          4-7-8 RELAKSASIYA NAFAS MASHQI
        </div>

        {/* Breathing Circle Animation */}
        <div className="relative w-48 h-48 md:w-60 md:h-60 mb-8 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-400 to-indigo-500 opacity-30 transition-transform duration-1000 ${
              isBreathing ? 'animate-breathe-circle' : ''
            }`}
          />
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#090e1a] border border-emerald-500/40 flex flex-col items-center justify-center p-4">
            <span className="text-4xl md:text-5xl font-extrabold font-display text-white">
              {timer}s
            </span>
            <span className="text-xs font-semibold text-emerald-300 mt-1">{breathPhase}</span>
          </div>
        </div>

        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-transform active:scale-95"
        >
          {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isBreathing ? 'PAUZA' : 'NAFAS MASHQINI BOSHLASH'}</span>
        </button>
      </div>

      {/* Pre-Stage Checklist */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800">
        <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Sahnaga chiqishdan oldingi 5 daqiqalik checklist</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prepChecklist.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
