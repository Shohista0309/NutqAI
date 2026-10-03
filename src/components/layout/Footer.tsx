'use client';

import React from 'react';
import Link from 'next/link';
import { Mic } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060912] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Mic className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">NUTQ AI</span>
          <span className="text-xs text-slate-500">| Vaysaqi AI Engine</span>
        </div>

        <p className="text-xs text-slate-500 text-center md:text-left">
          © 2026 NUTQ AI. O'zbek tilida erkin, aniq va ishonchli gapirish platformasi.
        </p>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/dashboard/speak" className="hover:text-white transition-colors">Gapirish Studio</Link>
          <Link href="/dashboard/pitch-simulator" className="hover:text-white transition-colors">Pitch Simulator</Link>
        </div>
      </div>
    </footer>
  );
}
