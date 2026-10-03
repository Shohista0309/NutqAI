'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flame, Trophy, Sparkles, User, Bell, Menu } from 'lucide-react';
import { getUserProfile } from '@/lib/db/storage';
import { UserProfile } from '@/types';

interface TopNavProps {
  onOpenMobileNav?: () => void;
}

export default function TopNav({ onOpenMobileNav }: TopNavProps) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#080d1a]/80 backdrop-blur-xl sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-slate-200">AI Nutq Murabbiyi</h2>
          <p className="text-xs text-slate-400">O'zbek tilida erkin va ishonchli gapirish platformasi</p>
        </div>
      </div>

      {/* Right: Gamification Badges & Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          <span>{user?.streak || 5} Kun</span>
        </div>

        {/* XP Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Trophy className="w-4 h-4 text-indigo-400" />
          <span>{user?.xp || 1450} XP</span>
        </div>

        {/* Level Tag */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{user?.level || "O'rta Spiker"}</span>
        </div>

        {/* Profile Avatar button */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-700/80 bg-slate-800/40 hover:bg-slate-700/50 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
            {user?.name?.[0] || 'J'}
          </div>
          <span className="text-xs font-medium text-slate-200 pr-2 hidden md:inline">
            {user?.name || 'Jasur Bek'}
          </span>
        </Link>
      </div>
    </header>
  );
}
