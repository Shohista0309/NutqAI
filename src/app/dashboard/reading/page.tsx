'use client';

import React, { useState } from 'react';
import { SAMPLE_READING_MATERIALS } from '@/lib/db/storage';
import { ExerciseItem } from '@/types';
import { BookOpen, Mic, CheckCircle2 } from 'lucide-react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';

export default function ReadingPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<ExerciseItem>(SAMPLE_READING_MATERIALS[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>SHE'R VA MATN O'QISH</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Ifodali O'qish Rejimi
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Matnni ovoz chiqarib o'qing. AI ritm, emotsional urg'u va pauzalarni baholaydi.
        </p>
      </div>

      {/* Select Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SAMPLE_READING_MATERIALS.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedMaterial(item)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedMaterial.id === item.id
                ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-base text-white mb-1">{item.title}</div>
            <p className="text-xs text-slate-400 mb-2">{item.description}</p>
            <span className="text-[11px] text-cyan-400 font-semibold">{item.durationMinutes} daqiqa mashq</span>
          </button>
        ))}
      </div>

      {/* Display Material & Audio Recorder */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold font-display text-white mb-2">{selectedMaterial.title}</h3>
          <p className="text-xs text-slate-400">{selectedMaterial.description}</p>
        </div>

        {/* Text viewer */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-base md:text-lg leading-relaxed font-serif whitespace-pre-line italic">
          {selectedMaterial.targetText}
        </div>

        {/* Audio recorder */}
        <AudioRecorderCanvas
          mode="reading"
          topic={`Matn o'qish: ${selectedMaterial.title}`}
          onAnalysisComplete={() => {}}
        />
      </div>
    </div>
  );
}
