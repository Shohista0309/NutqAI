'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card p-10 md:p-16 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>NUTQINGIZNI BUGUNDAN RIVOJLANTIRING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-6">
            Nutqingizni bugundan <br />
            <span className="gradient-text">yangi bosqichga olib chiqing</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
            AI nutq murabbiyi bilan kuniga 10-15 daqiqa shug'ullaning. Fikringizni aniq, mantiqiy va ishonch bilan yetkazing.
          </p>

          <div className="flex justify-center">
            <Link
              href="/onboarding"
              className="px-10 py-4 rounded-2xl gradient-button text-white font-extrabold text-base flex items-center gap-2 group shadow-xl"
            >
              <span>BEPUL BOSHLASH</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
