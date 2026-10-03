'use client';

import React from 'react';
import {
  Mic,
  Activity,
  Zap,
  BookOpen,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Award,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      title: 'AI Nutq Tahlili',
      desc: "Speech-to-Text va O'zbek tili NLP modeli orqali har bir so'zni chuqur tahlil qilish.",
      icon: Mic,
    },
    {
      title: 'Artikulyatsiya Mashqlari',
      desc: "Lab, til, jag' va diksiyani rivojlantiruvchi bosqichma-bosqich mashqlar.",
      icon: Activity,
    },
    {
      title: 'Tez Aytishlar',
      desc: "Oson, o'rta, qiyin va professional darajadagi tez aytishlar to'plami va aniqlik nazorati.",
      icon: Zap,
    },
    {
      title: "She'r va Hikoya O'qish",
      desc: "Matnni ifodali o'qish, pauzalarni to'g'ri me'yorda qo'yish va ritmni saqlash.",
      icon: BookOpen,
    },
    {
      title: 'Dialog Rejimi',
      desc: "Intervyu, do'st, mijoz yoki mentor bilan sun'iy intellekt orqali muloqot qilish.",
      icon: MessageSquare,
    },
    {
      title: 'Erkin Gapirish',
      desc: "Ixtiyoriy yoki AI bergan mavzuda 1 dan 5 daqiqagacha uzluksiz so'zlash.",
      icon: Sparkles,
    },
    {
      title: 'Hayajonni Boshqarish',
      desc: "4-7-8 nafas visualizeri va sahnaga chiqishdan oldingi ruhiy tayyorgarlik.",
      icon: ShieldCheck,
    },
    {
      title: 'Pitch & Interview Simulator',
      desc: "Startup taqdimotlari va ishga kirish intervyulariga AI investor bilan tayyorgarlik.",
      icon: Award,
    },
    {
      title: "Shaxsiy Mashg'ulot Rejasi",
      desc: "Foydalanuvchi zaif nuqtalariga qarab avtomatik moslashuvchi 7 kunlik reja.",
      icon: CalendarCheck,
    },
    {
      title: 'Progress tracking',
      desc: "WPM, filler kamayishi va ravonlik darajasining 1-hafta vs 4-hafta taqqoslash grafigi.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-24 bg-[#070b16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
            PLATFORMA FUNKSIYALARI
          </h2>
          <h3 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Nutqingizni rivojlantirish uchun <br />
            <span className="gradient-text">barcha zaruriy vositalar</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 glass-card-hover group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
