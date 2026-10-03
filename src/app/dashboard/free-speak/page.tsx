'use client';

import React, { useState } from 'react';
import { Sparkles, Clock, RefreshCw, Mic } from 'lucide-react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';

export default function FreeSpeakPage() {
  const [timerDuration, setTimerDuration] = useState(60); // 1 minute
  const [topic, setTopic] = useState('Texnologiyalarning insoniyat kelajagiga ta\'siri');

  const randomTopics = [
    'Texnologiyalarning insoniyat kelajagiga ta\'siri',
    'Nega vaqtni to\'g\'ri boshqarish (Time Management) muhim?',
    'Mening sevimli shahar va sayohat taassurotlarim',
    'Yaxshi yetakchi (Leader) bo\'lish uchun 3 ta muhim sifat',
    'Sun\'iy intellektning ta\'lim tizimidagi o\'rni',
  ];

  const handleRandomize = () => {
    const next = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(next);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ERKIN GAPIRISH MASHQI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Erkin Gapirish Studio
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Timer va berilgan mavzu bo'yicha uzluksiz gapiring. AI nutq strukturasi hamda mantiqni baholaydi.
        </p>
      </div>

      {/* Timer & Topic Setup */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Timer selector */}
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-2">Timer Davomiyligi</label>
          <div className="flex items-center gap-2">
            {[
              { sec: 30, label: '30 sek' },
              { sec: 60, label: '1 min' },
              { sec: 120, label: '2 min' },
              { sec: 300, label: '5 min' },
            ].map((t) => (
              <button
                key={t.sec}
                onClick={() => setTimerDuration(t.sec)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  timerDuration === t.sec
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-300">Nutq Mavzusi</label>
            <button
              onClick={handleRandomize}
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-3 h-3" /> tasodifiy mavzu
            </button>
          </div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Audio Recorder */}
      <AudioRecorderCanvas
        mode="free-speak"
        topic={topic}
        onAnalysisComplete={() => {}}
      />
    </div>
  );
}
