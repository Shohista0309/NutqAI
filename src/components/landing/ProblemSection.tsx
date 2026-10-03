'use client';

import React from 'react';
import { AlertCircle, Zap, ShieldAlert, FileText, VolumeX, Users } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Hayajondan gapni unutish',
      desc: "Auditoriya yoki investor oldiga chiqqanda hayajon sababli tayyorlangan asosiy fikrlar yoddan ko'tariladi.",
      icon: ShieldAlert,
    },
    {
      title: 'Juda tez gapirish',
      desc: "Fikrni tezroq tugatishga harakat qilish so'zlarning bir-biriga qo'shilib ketishiga va tushunarsiz diksiyaga olib keladi.",
      icon: Zap,
    },
    {
      title: 'Keraksiz so\'zlarni ko\'p ishlatish',
      desc: "'Eee', 'emm', 'haligi', 'anaqa', 'demak' kabi parazit so'zlar nutqning salmog'i va jiddiyligini pasaytiradi.",
      icon: VolumeX,
    },
    {
      title: 'Fikrni tartibli yetkaza olmaslik',
      desc: "Mantiqiy kirish, dalil va xulosa bo'lmagani sababli tinglovchilar diqqatini ushlab turish qiyinlashadi.",
      icon: FileText,
    },
    {
      title: 'Talaffuzdagi kamchiliklar',
      desc: "Ayrim tovushlar va tez aytishlardagi diksiya muammolari sababli so'zlar noaniq eshitiladi.",
      icon: AlertCircle,
    },
    {
      title: 'Auditoriya oldida ishonchsizlik',
      desc: "Intervyu, pitch yoki prezentatsiyalarda o'ziga bo'lgan ishonch yetishmasligi sababli imkoniyatlar yo'qotiladi.",
      icon: Users,
    },
  ];

  return (
    <section className="py-20 bg-[#070b16] relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3">
            ASOSIY MUAMMOLAR
          </h2>
          <h3 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Ko'pchilik spikerlar duch keladigan <br />
            <span className="text-slate-400">to'siqlar va kamchiliklar</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-rose-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-400 group-hover:scale-110 transition-transform">
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
