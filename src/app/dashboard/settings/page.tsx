'use client';

import React, { useState } from 'react';
import { Settings, Save, Key, Shield, Mic, Bell } from 'lucide-react';
import { saveUserProfile, getUserProfile } from '@/lib/db/storage';

export default function SettingsPage() {
  const user = getUserProfile();
  const [name, setName] = useState(user.name);
  const [dailyTime, setDailyTime] = useState(user.dailyGoalMinutes);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile({ name, dailyGoalMinutes: dailyTime });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>TIZIM SOZLAMALARI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Sozlamalar
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Hisobingiz va AI nutq murabbiyi modullarini moslashtiring.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">Shaxsiy Ma'lumotlar</h3>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Ismingiz</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Kunlik Maqsad (Daqiqa)</label>
            <input
              type="number"
              value={dailyTime}
              onChange={(e) => setDailyTime(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">AI & Speech Provider</h3>
          <p className="text-xs text-slate-400">
            Nutq transkripsiyasi va AI tahlili avtomatik server route orqali amalga oshiriladi. Secretlar .env orqali boshqariladi.
          </p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>AI Provider Moduli: Active (OpenAI Whisper + Uzbek Speech NLP Fallback)</span>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 rounded-2xl gradient-button font-bold text-sm text-white shadow-xl flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>SAQLASH</span>
        </button>

        {saved && (
          <span className="text-xs text-emerald-400 font-semibold block">Sozlamalar saqlandi!</span>
        )}
      </form>
    </div>
  );
}
