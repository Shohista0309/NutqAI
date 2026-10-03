'use client';

import React, { useState } from 'react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';
import ScoreRadar from '@/components/speech/ScoreRadar';
import FeedbackList from '@/components/speech/FeedbackList';
import FillersBreakdownCard from '@/components/speech/FillersBreakdownCard';
import { SpeechAnalysisResult, ExerciseCategory } from '@/types';
import { Mic, Sparkles, RefreshCw, Volume2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SpeakStudioPage() {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>('free-speak');
  const [topic, setTopic] = useState('Texnologiyaning kelajagi va AI rivojlanishi');
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);

  const modeOptions = [
    { id: 'free-speak', name: 'Erkin Gapirish', desc: 'Ixtiyoriy mavzuda nutq so\'zlash' },
    { id: 'pitch', name: 'Startup Pitch', desc: 'Investor va hakamlar oldida taqdimot' },
    { id: 'tongue-twister', name: 'Tez Aytish', desc: 'Diksiya va talaffuz sinovi' },
    { id: 'reading', name: 'Matn O\'qish', desc: 'She\'r va hikoyani ifodali o\'qish' },
    { id: 'dialogue', name: 'Dialog Simulator', desc: 'AI bilan savol-javob suhbati' },
  ];

  const topicPrompts = [
    'Texnologiyaning kelajagi va AI rivojlanishi',
    'Nega men ushbu vaqtda ushbu ishni tanladim?',
    'Mening eng katta professional yutug\'im',
    'O\'zbekistonda startuplar rivojlanish imkoniyatlari',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
            <Mic className="w-7 h-7 text-indigo-400" />
            <span>Gapirish Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Mikrofon orqali gapiring. AI nutqingizni real vaqtda tahlil qiladi.
          </p>
        </div>

        {analysisResult && (
          <button
            onClick={() => setAnalysisResult(null)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Yangi Yozuv Boshlash</span>
          </button>
        )}
      </div>

      {!analysisResult ? (
        <>
          {/* Mode Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {modeOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(item.id as ExerciseCategory)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedCategory === item.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs text-white mb-0.5">{item.name}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
              </button>
            ))}
          </div>

          {/* Topic Selector */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 block">Nutq Mavzusi / Sarlavha</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Mavzuni kiriting..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">Tayyor mavzular:</span>
              {topicPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setTopic(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Recorder Component */}
          <AudioRecorderCanvas
            mode={selectedCategory}
            topic={topic}
            onAnalysisComplete={(result) => setAnalysisResult(result)}
          />
        </>
      ) : (
        /* Detailed Analysis Dashboard View */
        <div className="space-y-8 animate-fade-in">
          {/* Header Summary Card */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NUTQINGIZ TAHLIL QILINDI</span>
                </div>
                <h2 className="text-2xl font-display font-extrabold text-white">{analysisResult.title}</h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span>Davomiyligi: <strong>{analysisResult.durationSeconds} soniya</strong></span>
                  <span>•</span>
                  <span>Tezlik: <strong className="text-cyan-300">{analysisResult.wpm} WPM ({analysisResult.pacingStatus})</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="text-center">
                  <div className="text-3xl font-extrabold font-display text-indigo-400">
                    {analysisResult.scores.overall}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Overall Score</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-center">
                  <div className="text-3xl font-extrabold font-display text-amber-400">
                    {analysisResult.totalFillersCount}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Filler so'z</div>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript Card */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800">
            <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <span>Transkripsiya va O'zbek Tili Tahlili</span>
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed font-mono">
              "{analysisResult.transcript}"
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScoreRadar
              scores={analysisResult.scores}
              wpm={analysisResult.wpm}
              pacingStatus={analysisResult.pacingStatus}
            />
            <FillersBreakdownCard
              fillers={analysisResult.fillers}
              totalFillersCount={analysisResult.totalFillersCount}
            />
          </div>

          {/* AI Feedback List */}
          <FeedbackList feedbackList={analysisResult.feedbackList} />
        </div>
      )}
    </div>
  );
}
