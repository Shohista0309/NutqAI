'use client';

import React, { useState } from 'react';
import { SAMPLE_TONGUE_TWISTERS } from '@/lib/db/storage';
import { ExerciseItem, SpeechAnalysisResult } from '@/types';
import { Zap, Mic, CheckCircle2, RefreshCw, Volume2 } from 'lucide-react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';

export default function TongueTwistersPage() {
  const [selectedTwister, setSelectedTwister] = useState<ExerciseItem>(SAMPLE_TONGUE_TWISTERS[0]);
  const [activeTab, setActiveTab] = useState<'Oson' | 'O\'rta' | 'Qiyin' | 'Professional'>('Oson');
  const [analysis, setAnalysis] = useState<SpeechAnalysisResult | null>(null);

  const filteredTwisters = SAMPLE_TONGUE_TWISTERS.filter((t) => t.difficulty === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>O'ZBEKCHA TEZ AYTISHLAR</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Tez Aytishlar va Diksiya Sinovi
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Diksiyangizni o'zbek tilidagi qiyin tez aytishlar orqali charxlang va AI bahosini oling.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {(['Oson', 'O\'rta', 'Qiyin', 'Professional'] as const).map((level) => (
          <button
            key={level}
            onClick={() => {
              setActiveTab(level);
              const found = SAMPLE_TONGUE_TWISTERS.find((t) => t.difficulty === level);
              if (found) setSelectedTwister(found);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === level
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Selected Twister Detail & Recorder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Target Text & Instructions */}
        <div className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {selectedTwister.difficulty} Daraja
            </span>
            <span className="text-xs text-slate-500">{selectedTwister.durationMinutes} daqiqa</span>
          </div>

          <h3 className="text-xl font-bold text-white font-display">{selectedTwister.title}</h3>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm font-semibold leading-relaxed">
            "{selectedTwister.targetText}"
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Ko'rsatmalar:
            </span>
            {selectedTwister.instructions.map((inst, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{inst}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Audio Recorder & Result */}
        <div className="lg:col-span-2 space-y-6">
          {!analysis ? (
            <AudioRecorderCanvas
              mode="tongue-twister"
              topic={`Tez Aytish: ${selectedTwister.title}`}
              onAnalysisComplete={(res) => setAnalysis(res)}
            />
          ) : (
            <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">Tez Aytish Natijasi</h4>
                  <p className="text-xs text-slate-400">Nutq aniqligi va WPM tezlik bahosi</p>
                </div>
                <button
                  onClick={() => setAnalysis(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Qaytadan yozish
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{analysis.scores.pronunciation}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Talaffuz Aniqligi</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{analysis.wpm} WPM</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Nutq Tezligi</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl font-bold text-amber-400">{analysis.totalFillersCount} ta</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Adashgan so'zlar</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-indigo-400 block mb-1">Transkripsiyada eshitilgan:</span>
                "{analysis.transcript}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
