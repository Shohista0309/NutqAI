'use client';

import React from 'react';
import { Mic, Cpu, Lightbulb, LineChart } from 'lucide-react';

export default function WorkflowSection() {
  const steps = [
    {
      step: '01',
      title: 'Gapiring',
      desc: 'Mikrofon tugmasini bosing va berilgan mavzu yoki matn bo\'yicha erkin so\'zlang.',
      icon: Mic,
    },
    {
      step: '02',
      title: 'AI Tinglaydi & Tahlil Qiladi',
      desc: 'Speech-to-Text va Uzbek NLP modeli WPM, pauza hamda fillerlarni avtomatik hisoblaydi.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Aniq Tavsiya Oling',
      desc: 'AI har bir xato va pauza bo\'yicha vaqtli, amaliy va tushunarli feedback beradi.',
      icon: Lightbulb,
    },
    {
      step: '04',
      title: 'Natijani Kuzating',
      desc: 'Kunlik va haftalik progress grafiklarida nutqingiz o\'sishini nazorat qiling.',
      icon: LineChart,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
            ISHLASH PRINSIP
          </h2>
          <h3 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            4 oddiy bosqichda <br />
            <span className="gradient-text">mukammal nutq sari</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-slate-800 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-display text-indigo-500/40 group-hover:text-indigo-400 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
