'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mic, Sparkles, Play, Pause, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8 animate-fade-in shadow-lg shadow-indigo-500/10">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>O'zbek tilidagi birinchi professional AI Nutq Murabbiyi</span>
        </div>

        {/* Main Headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Fikringizni aniq ayting. <br />
          <span className="gradient-text">Ishonch bilan gapiring.</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
          O‘zbek tilidagi AI nutq murabbiyi sizning nutqingizni real vaqtda tahlil qiladi, filler so‘zlarni aniqlaydi va har kuni yaxshilanishga shaxsiy tavsiyalar beradi.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-button text-white font-bold text-base flex items-center justify-center gap-2 group"
          >
            <span>BEPUL BOSHLASH</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card hover:bg-slate-800/80 text-slate-200 font-semibold text-base border border-slate-700/80 flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>QANDAY ISHLAYDI?</span>
          </a>
        </div>

        {/* Waveform & Visualizer Demo Card */}
        <div className="max-w-4xl mx-auto glass-card p-6 md:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AI Speech Analyzer Demo
              </span>
            </div>
            <span className="text-xs text-indigo-400 font-medium">O'zbek tili STT & NLP Engine</span>
          </div>

          {/* Simulated Waveform Animation */}
          <div className="h-20 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center gap-1.5 px-4 mb-6">
            {[40, 75, 30, 90, 100, 60, 45, 85, 95, 35, 70, 80, 50, 95, 65, 40, 85, 100, 55, 75, 45, 90, 30, 60].map(
              (h, i) => (
                <div
                  key={i}
                  className="w-1.5 md:w-2 bg-gradient-to-t from-indigo-600 via-purple-500 to-cyan-400 rounded-full animate-wave-bar"
                  style={{
                    height: isPlayingDemo ? `${h}%` : `${(h * 0.4)}%`,
                    animationDelay: `${(i % 5) * 0.15}s`,
                  }}
                />
              )
            )}
          </div>

          {/* Audio Sample Controls & Output */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-left">
            <button
              onClick={() => setIsPlayingDemo(!isPlayingDemo)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shrink-0 shadow-md"
            >
              {isPlayingDemo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingDemo ? 'To\'xtatish' : 'Namuna tinglash (Demo)'}</span>
            </button>

            <div className="text-xs text-slate-300 flex-1">
              <span className="text-amber-400 font-semibold">Tahlil natijasi: </span>
              "Nutq tezligi: <strong className="text-white">152 WPM</strong> | Filler: <strong className="text-rose-400">2 ta ('demak', 'haligi')</strong> | Ravonlik: <strong className="text-emerald-400">88/100</strong>"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
