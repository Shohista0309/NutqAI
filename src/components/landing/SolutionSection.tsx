'use client';

import React from 'react';
import { CheckCircle2, Sparkles, Cpu, Target, Award } from 'lucide-react';

export default function SolutionSection() {
  const solutions = [
    {
      title: 'O\'zbek tilini tushunuvchi AI',
      desc: "Oddiy speech-to-text emas, o'zbek tili grammatikasi va nutq uslubini chuqur tahlil qiluvchi sun'iy intellekt.",
    },
    {
      title: 'Real vaqtda diksiya va temp hisobi',
      desc: "Words Per Minute (WPM) tezligi, pauza joylari va filler so'zlar avtomatik sekundigacha aniqlanadi.",
    },
    {
      title: 'Individual mashg\'ulot rejasi',
      desc: "Sizning darajangiz va maqsadingizga moslashtirilgan 7 kunlik amaliy mashqlar seriyasi.",
    },
    {
      title: 'Startup Pitch & Intervyu Simulatori',
      desc: "AI investor va intervyuer bilan real vaqt rejimida savol-javob o'tkazish imkoniyati.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INNOVATSION YECHIM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-6">
              NUTQ AI qanday qilib nutqingizni <br />
              <span className="gradient-text">yangiy darajaga olib chiqadi?</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              NUTQ AI sizning shaxsiy nutq murabbiyingiz bo'lib, har bir yozib olingan audioni statistik raqamlar, WPM tezlik va filler so'zlar bo'yicha tahlil qiladi hamda o'sish dinamikasini ko'rsatadi.
            </p>

            <div className="space-y-4">
              {solutions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-indigo-500/30 relative">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Shaxsiy Nutq Ko'rsatkichlari</h4>
                <p className="text-xs text-slate-400">Nutq AI Dashboard Tizimi</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Ravonlik darajasi</span>
                <span className="text-sm font-bold text-indigo-400">92 / 100</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Filler so'zlar kamayishi</span>
                <span className="text-sm font-bold text-emerald-400">-78% (Haftalik)</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">Nutq tezligi (WPM)</span>
                <span className="text-sm font-bold text-cyan-400">148 WPM (Optimal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
