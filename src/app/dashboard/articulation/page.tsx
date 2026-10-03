'use client';

import React, { useState } from 'react';
import { Activity, Play, CheckCircle2, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import AudioRecorderCanvas from '@/components/speech/AudioRecorderCanvas';

export default function ArticulationPage() {
  const [activeTab, setActiveTab] = useState<'lip' | 'tongue' | 'jaw' | 'voice'>('lip');
  const [showRecorder, setShowRecorder] = useState(false);

  const exercises = {
    lip: [
      {
        title: "Lablarni cho'zish ('O' - 'U' - 'I')",
        purpose: "Lab muskullari harakatchanligini va diksiyani kuchaytirish",
        duration: "2 daqiqa",
        instructions: [
          "Ovozingizni past tembrda tutib 'O-O-O' deb 3 soniya cho'zing.",
          "So'ngra lablarni oldinga cho'zib 'U-U-U' va 'I-I-I' tovushlarini ketma-ket ayting.",
          "10 marta qaytaring."
        ],
        sampleAudio: "O - U - I diksiya mashqi"
      },
      {
        title: "Lab titratish (Vocal Trill)",
        purpose: "Lablardagi zo'riqishni olib tashlash va havo oqimini tekislash",
        duration: "1.5 daqiqa",
        instructions: [
          "Nafasni lablar orqali 'Br-r-r' tovushi bilan chiqarib lablarni titrating.",
          "5 marta takrorlang."
        ]
      }
    ],
    tongue: [
      {
        title: "Til uchi bilan tishlarni sanash",
        purpose: "Til harakatchanligi va tezligini oshirish",
        duration: "2 daqiqa",
        instructions: [
          "Til uchini yuqori va pastki tishlarning ichki tomoni bo'ylab sekin yurgizing.",
          "Soat yo'nalishi bo'yicha va qarama-qarshi 5 marta aylantiring."
        ]
      },
      {
        title: "Til bilan tanglayga urish ('T-D-L-R')",
        purpose: "Portlovchi tovushlar diksiyasini ravon qilish",
        duration: "3 daqiqa",
        instructions: [
          "T-T-T, D-D-D, L-L-L, R-R-R tovushlarini ketma-ket va dona-dona ayting."
        ]
      }
    ],
    jaw: [
      {
        title: "Jag'ni bo'shashtirish va pastga tushirish",
        purpose: "Jag' muskullaridagi taranglikni yo'qotib, ovoz naychalarini ochish",
        duration: "2 daqiqa",
        instructions: [
          "Og'izni asta-sekin va qulay darajada keng oching.",
          "'A-A-A' tovushini past tembrda 5 soniya ayting."
        ]
      }
    ],
    voice: [
      {
        title: "Diafragma nafasi va 'M-M-M' g'ulallash",
        purpose: "Ovozga chuqurlik, salmoq va jarangdorlik berish",
        duration: "3 daqiqa",
        instructions: [
          "Qorin bilan chuqur nafas oling.",
          "Lablarni yopgan holda 'M-M-M' deb ko'krak qafasidagi vibratsiyani his qiling."
        ]
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>DIKSIYA VA ARTIKULYATSIYA</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
          Artikulyatsiya Mashqlari
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Lab, til, jag' hamda ovoz apparatini nutqqa tayyorlovchi professional diksiya mashqlari.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'lip', name: 'Lab mashqlari' },
          { id: 'tongue', name: 'Til mashqlari' },
          { id: 'jaw', name: 'Jag\' mashqlari' },
          { id: 'voice', name: 'Ovoz va Tembr' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises[activeTab].map((ex, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-white">{ex.title}</h3>
                <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  {ex.duration}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{ex.purpose}</p>

              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Ketma-ketlik:
                </span>
                {ex.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowRecorder(true)}
              className="w-full py-3 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>OVOZ YOZIB MASHQ QILISH</span>
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Recording Studio Modal */}
      {showRecorder && (
        <div className="glass-card p-6 rounded-3xl border border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Artikulyatsiya Ovoz Sinovi</h3>
            <button
              onClick={() => setShowRecorder(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Yopish
            </button>
          </div>

          <AudioRecorderCanvas
            mode="articulation"
            topic="Artikulyatsiya va Diksiya Sinovi"
            onAnalysisComplete={() => {}}
          />
        </div>
      )}
    </div>
  );
}
