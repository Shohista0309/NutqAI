'use client';

import React, { useEffect, useState } from 'react';
import { getUserProfile } from '@/lib/db/storage';
import { UserProfile } from '@/types';
import { User, Award, Flame, Trophy, Calendar, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-1 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
          {user?.name?.[0] || 'J'}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-white">{user?.name}</h1>
          <p className="text-xs text-slate-400">{user?.email}</p>
          <div className="flex items-center gap-3 mt-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              {user?.level}
            </span>
            <span className="text-slate-400">A'zo bo'lingan: {user?.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center">
          <Flame className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{user?.streak} Kun</div>
          <div className="text-xs text-slate-400">Streak saqlanmoqda</div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center">
          <Trophy className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{user?.xp} XP</div>
          <div className="text-xs text-slate-400">Jami to'plangan ochkolar</div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 text-center">
          <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">Spiker Pro</div>
          <div className="text-xs text-slate-400">Notiqlik darajasi</div>
        </div>
      </div>
    </div>
  );
}
