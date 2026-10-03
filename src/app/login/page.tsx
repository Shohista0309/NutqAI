'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mic, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { saveUserProfile } from '@/lib/db/storage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      saveUserProfile({ email, name: email.split('@')[0] });
    }
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#060913] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-indigo-500/20 shadow-2xl relative z-10">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-white">NUTQ AI</span>
        </Link>

        <h2 className="text-2xl font-bold text-center mb-2">Tizimga kirish</h2>
        <p className="text-xs text-slate-400 text-center mb-6">
          NUTQ AI murabbiyingiz bilan mashqlarni davom ettiring
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Email manzilingiz</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ism@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Parol</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-button font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2"
          >
            <span>KIRISH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-400">
            Hali hisobingiz yo'qmi?{' '}
            <Link href="/register" className="text-indigo-400 font-semibold hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
