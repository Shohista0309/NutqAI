'use client';

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/landing/Hero';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import WorkflowSection from '@/components/landing/WorkflowSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/layout/Footer';
import { Mic } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#060913]/80 backdrop-blur-xl border-b border-slate-800/60 px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              NUTQ <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
          >
            Kirish
          </Link>

          <Link
            href="/onboarding"
            className="px-5 py-2.5 rounded-xl gradient-button text-white text-xs md:text-sm font-bold shadow-lg"
          >
            BEPUL BOSHLASH
          </Link>
        </div>
      </header>

      {/* Landing Sections */}
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesGrid />
        <WorkflowSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
