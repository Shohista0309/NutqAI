'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Mic,
  Activity,
  Zap,
  BookOpen,
  MessageSquare,
  Sparkles,
  Award,
  CalendarCheck,
  TrendingUp,
  History,
  User,
  Settings,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export default function Sidebar({ className, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroup1 = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Gapirish Studio', href: '/dashboard/speak', icon: Mic, highlight: true },
    { name: 'Pitch / Interview', href: '/dashboard/pitch-simulator', icon: Award, highlight: true },
  ];

  const navigationGroup2 = [
    { name: 'Artikulyatsiya', href: '/dashboard/articulation', icon: Activity },
    { name: 'Tez Aytishlar', href: '/dashboard/tongue-twisters', icon: Zap },
    { name: 'O\'qish Rejimi', href: '/dashboard/reading', icon: BookOpen },
    { name: 'Dialog Rejimi', href: '/dashboard/dialogue', icon: MessageSquare },
    { name: 'Erkin Gapirish', href: '/dashboard/free-speak', icon: Sparkles },
    { name: 'Hayajonni Boshqarish', href: '/dashboard/anxiety-control', icon: ShieldCheck },
  ];

  const navigationGroup3 = [
    { name: '7 Kunlik Reja', href: '/dashboard/plan', icon: CalendarCheck },
    { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
    { name: 'Tarix va Tahlillar', href: '/dashboard/history', icon: History },
    { name: 'Profil', href: '/dashboard/profile', icon: User },
    { name: 'Sozlamalar', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside
      className={clsx(
        'w-64 bg-[#080d1a]/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-40 select-none',
        className
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto px-4 py-5 scrollbar-thin">
        {/* Brand Header */}
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-3 px-2 mb-6 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              NUTQ <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Vaysaqi AI Engine</div>
          </div>
        </Link>

        {/* Group 1: Core */}
        <div className="space-y-1 mb-6">
          <div className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Asosiy Studio
          </div>
          {navigationGroup1.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={clsx('w-4 h-4', isActive ? 'text-white' : 'text-indigo-400')} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Group 2: Practice Tiers */}
        <div className="space-y-1 mb-6">
          <div className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Mashg'ulot Rejimlari
          </div>
          {navigationGroup2.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200',
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )}
              >
                <Icon className={clsx('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Group 3: Analytics & Personal */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Tahlil va Reja
          </div>
          {navigationGroup3.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200',
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                )}
              >
                <Icon className={clsx('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="glass-card p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-1 text-amber-400 font-semibold text-xs">
            <Flame className="w-4 h-4" />
            <span>5 Kunlik Streak!</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Kunlik mashqni bajaring va diksiyangizni yaxshilang.
          </p>
        </div>
      </div>
    </aside>
  );
}
