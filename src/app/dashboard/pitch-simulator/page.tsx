'use client';

import React, { useState } from 'react';
import { PitchQuestion, SpeechAnalysisResult } from '@/types';
import { Award, Mic, ArrowRight, Bot, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';

const PITCH_SIMULATOR_QUESTIONS: PitchQuestion[] = [
  {
    id: 1,
    category: 'Problem',
    question: "Loyihangiz qanday dolzarb muammoni hal qilmoqda va bu muammo kimlarga tegishli?",
    contextHint: "Muammoni aniq statistika yoki hayotiy misol bilan 30-45 soniyada yetkazing."
  },
  {
    id: 2,
    category: 'Solution',
    question: "Siz taklif qilayotgan yechim qanday ishlaydi va uning noyob ustunligi nimada?",
    contextHint: "Mahsulotingizning 2 ta asosiy xususiyatiga urg'u bering, ortiqcha texnik atamalarni kamaytiring."
  },
  {
    id: 3,
    category: 'Market',
    question: "Bozor hajmi (TAM, SAM, SOM) qancha va birinchi mijozlarni qanday jalb qilasiz?",
    contextHint: "Raqamlarni aniq va ishonch bilan ayting, ikkilanmang."
  },
  {
    id: 4,
    category: 'BusinessModel',
    question: "Monetizatsiya va biznes modelingiz qanday? Qanday daromad olasiz?",
    contextHint: "SaaS obuna, komissiya yoki bir martalik to'lov modelini ravon tushuntiring."
  },
  {
    id: 5,
    category: 'Team',
    question: "Nega aynan siz va jamoangiz bu loyihani muvaffaqiyatli amalga oshira olasiz?",
    contextHint: "Jamoa tajribasi va ishtiyoqini samimiy, lekin kuchli nutq bilan yetkazing."
  }
];

export default function PitchSimulatorPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [aiEvaluation, setAiEvaluation] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentQ = PITCH_SIMULATOR_QUESTIONS[currentIdx];

  const handlePitchRecorded = async (result: SpeechAnalysisResult) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQ.id,
          questionText: currentQ.question,
          userResponseText: result.transcript,
        }),
      });

      const evalData = await res.json();
      setAiEvaluation({ ...evalData, speechResult: result });
    } catch (e) {
      setAiEvaluation({
        investorFeedback: "Javobingiz yaxshi. Lekin bozor hajmi bo'yicha aniq raqamlarga urg'u bering.",
        score: 84,
        followUpQuestion: "Raqobatchilaringizdan ustunligingiz nimada?",
        speechResult: result,
      });
    }
    setIsAnalyzing(false);
  };

  const nextQuestion = () => {
    setAiEvaluation(null);
    if (currentIdx < PITCH_SIMULATOR_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>VENTURE INVESTOR SIMULATORI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Startup Pitch & Intervyu Simulatori
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          AI investor bilan pitch taqdimoti. Savollarga mikrofon orqali javob bering va tanqidiy feedback oling.
        </p>
      </div>

      {/* Question Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Savol {currentIdx + 1} / {PITCH_SIMULATOR_QUESTIONS.length} — [{currentQ.category}]
          </span>
          <span className="text-xs text-slate-500">Tavsiya: 45 sek javob</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
          "{currentQ.question}"
        </h3>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 italic">
          💡 Investor maslahati: {currentQ.contextHint}
        </div>
      </div>

      {!aiEvaluation ? (
        <AudioRecorderCanvas
          mode="pitch"
          topic={`Pitch Q&A: ${currentQ.category}`}
          onAnalysisComplete={handlePitchRecorded}
        />
      ) : (
        /* Evaluation View */
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-emerald-500/30 space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                {aiEvaluation.score}
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Investor Bahosi</h4>
                <p className="text-xs text-slate-400">Javob va pitch sifati tahlili</p>
              </div>
            </div>

            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-2xl gradient-button text-white font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <span>KEYINGI SAVOLGA O'TISH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/20 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-indigo-300 block mb-1">Investor Mulohazasi:</span>
            {aiEvaluation.investorFeedback}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-amber-300">
            <span className="font-bold text-amber-400 block mb-1">Investorning keyingi savoli:</span>
            "{aiEvaluation.followUpQuestion}"
          </div>
        </div>
      )}
    </div>
  );
}
