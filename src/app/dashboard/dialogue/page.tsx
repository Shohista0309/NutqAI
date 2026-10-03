'use client';

import React, { useState } from 'react';
import { MessageSquare, Mic, Bot, User, Sparkles, Send } from 'lucide-react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';
import { DialogueTurn } from '@/types';

export default function DialoguePage() {
  const [role, setRole] = useState<'interview' | 'investor' | 'friend' | 'mentor'>('interview');
  const [turns, setTurns] = useState<DialogueTurn[]>([
    {
      id: 'turn-1',
      sender: 'ai',
      text: "Assalomu alaykum! Men bugungi intervyuda siz bilan suhbatlashaman. Avvalo, o'zingiz va oxirgi tajribangiz haqida qisqacha gapirib bera olasizmi?",
      timestamp: '14:30',
    },
  ]);
  const [isRecordingAnswer, setIsRecordingAnswer] = useState(false);

  const rolesList = [
    { id: 'interview', label: 'Ish Intervyusi', desc: 'HR hamda Tech lead bilan suhbat' },
    { id: 'investor', label: 'Startup Investor', desc: 'Venture kapitalist bilan pitch muloqot' },
    { id: 'friend', label: 'Do\'st bilan suhbat', desc: 'Erkin va yaqin muloqot mashqi' },
    { id: 'mentor', label: 'Mentor Sessiyasi', desc: 'Karyera va maqsadlar muhokamasi' },
  ];

  const handleAnswerRecorded = (result: any) => {
    const userMessage: DialogueTurn = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: result.transcript,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      analysis: result,
    };

    // AI Next turn reply simulation
    const aiNext: DialogueTurn = {
      id: 'ai-' + Date.now(),
      sender: 'ai',
      text: "Javobingiz uchun rahmat. Nutq tezligingiz yaxshi. Keyingi savol: Ushbu rolda duch kelgan eng qiyin muammoingiz nima bo'lgan va uni qanday hal qilgansiz?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTurns((prev) => [...prev, userMessage, aiNext]);
    setIsRecordingAnswer(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>INTERAKTIV DIALOG REJIMI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          AI bilan Ovozli Muloqot
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Turli ssenariylar bo'yicha sun'iy intellekt bilan muloqot qiling. AI javobingizni tahlil qiladi va moslashadi.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {rolesList.map((r) => (
          <button
            key={r.id}
            onClick={() => setRole(r.id as any)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              role === r.id
                ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-xs text-white">{r.label}</div>
            <div className="text-[10px] text-slate-400">{r.desc}</div>
          </button>
        ))}
      </div>

      {/* Chat Conversation Thread */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4 max-h-[500px] overflow-y-auto">
        {turns.map((turn) => (
          <div
            key={turn.id}
            className={`flex items-start gap-3 ${turn.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                turn.sender === 'ai' ? 'bg-indigo-600 text-white' : 'bg-cyan-500 text-black'
              }`}
            >
              {turn.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-xl p-4 rounded-2xl border text-sm leading-relaxed ${
                turn.sender === 'ai'
                  ? 'bg-slate-900 border-slate-800 text-slate-200'
                  : 'bg-indigo-600/30 border-indigo-500/40 text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  {turn.sender === 'ai' ? 'AI Intervyuer' : 'Sizning javobingiz'}
                </span>
                <span className="text-[10px] text-slate-500">{turn.timestamp}</span>
              </div>
              <p>{turn.text}</p>

              {turn.analysis && (
                <div className="mt-2 pt-2 border-t border-indigo-500/30 text-xs text-cyan-300 flex items-center justify-between">
                  <span>Score: {turn.analysis.scores?.overall || 85}/100</span>
                  <span>WPM: {turn.analysis.wpm || 145}</span>
                  <span>Filler: {turn.analysis.totalFillersCount || 0} ta</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Answer Studio */}
      <div className="glass-card p-6 rounded-3xl border border-indigo-500/30">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Mic className="w-4 h-4 text-indigo-400" />
          <span>Mikrofon Orqali Javob Berish</span>
        </h3>

        <AudioRecorderCanvas
          mode="dialogue"
          topic={`Dialog (${role})`}
          onAnalysisComplete={handleAnswerRecorded}
        />
      </div>
    </div>
  );
}
