'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, CheckCircle2, Target, Clock, ShieldAlert, Zap, Mic } from 'lucide-react';
import { saveUserProfile } from '@/lib/db/storage';
import { UserGoal } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [goal, setGoal] = useState<UserGoal>('startup_pitch');
  const [level, setLevel] = useState("Boshlovchi (Beginner)");
  const [dailyTime, setDailyTime] = useState(15);
  const [mainIssue, setMainIssue] = useState("Filler so'zlar (\"demak\", \"haligi\")");
  const [focusArea, setFocusArea] = useState('Pitch va Taqdimotlar');

  const goalsList = [
    { id: 'startup_pitch', title: 'Startup Pitch', desc: 'Investor va hakamlar oldida taqdimot qilish' },
    { id: 'job_interview', title: 'Ish intervyusi', desc: 'HR hamda texnik suhbatlarda ishonchli javob berish' },
    { id: 'presentation', title: 'Prezentatsiya', desc: "Katta auditoriya oldida ma'ruza o'qish" },
    { id: 'daily_communication', title: 'Kundalik muloqot', desc: "Hamkasblar va do'stlar bilan ravon gapirish" },
    { id: 'public_speaking', title: 'Omma oldida chiqish', desc: "Sahnadagi hayajonni bosish va nutq so'zlash" },
    { id: 'pronunciation', title: 'Talaffuz va Diksiya', desc: 'Tovushlarni aniq va dona-dona aytish' },
    { id: 'fluency', title: 'Ravon gapirish', desc: "Pauzalarni to'g'ri qo'llash va tempni boshqarish" },
  ];

  const levelsList = [
    { title: 'Boshlovchi (Beginner)', desc: "Tez-tez hayajonlanaman va so'zlarni unutaman" },
    { title: "O'rta daraja (Intermediate)", desc: "Ravon gapiraman, lekin filler so'zlarim ko'p" },
    { title: 'Tajribali Spiker (Advanced)', desc: "Diksiyam yaxshi, lekin pitch va emotsiyani oshirmoqchiman" },
  ];

  const timesList = [
    { time: 5, label: 'Kuniga 5 daqiqa', desc: 'Qisqa va samarali kunlik diksiya mashqi' },
    { time: 15, label: 'Kuniga 15 daqiqa (Tavsiya etiladi)', desc: "Optimal intensivlikdagi mashg'ulot rejimi" },
    { time: 30, label: 'Kuniga 30 daqiqa', desc: 'Professional notiqlik darajasiga tayyorgarlik' },
  ];

  const issuesList = [
    'Filler so\'zlar ("demak", "haligi", "eee")',
    "Juda tez gapirish va so'zlarni qo'shib yuborish",
    'Auditoriya oldida kuchli hayajon',
    'Fikrni mantiqiy va tartibli yetkaza olmaslik',
    'Talaffuz va diksiya kamchiliklari',
  ];

  const handleFinish = () => {
    saveUserProfile({
      goal,
      level,
      dailyGoalMinutes: dailyTime,
      mainIssue,
      focusArea,
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#060913] text-white flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-indigo-400" />
          <span className="font-display font-bold text-lg text-white">NUTQ AI Onboarding</span>
        </div>
        <div className="text-xs font-semibold text-slate-400">
          Bosqich <span className="text-indigo-400 font-bold">{step}</span> / 5
        </div>
      </div>

      {/* Progress Line */}
      <div className="max-w-3xl mx-auto w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Questionnaire Card */}
      <div className="max-w-3xl mx-auto w-full glass-card p-6 sm:p-10 rounded-3xl border border-indigo-500/20 shadow-2xl flex-1 flex flex-col justify-between">
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <Target className="w-4 h-4" />
              <span>1-BOSQICH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 text-white">
              Asosiy maqsadingiz nima?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              AI murabbiy mashg'ulotlarni aynan shu maqsadga yo'naltiradi
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalsList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setGoal(item.id as UserGoal)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    goal === item.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{item.title}</span>
                    {goal === item.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="text-xs text-slate-400 block leading-tight">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <Zap className="w-4 h-4" />
              <span>2-BOSQICH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 text-white">
              Hozirgi nutq darajangizni baholang
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Mos darajadagi amaliyot va tez aytishlar tanlanadi
            </p>

            <div className="space-y-3">
              {levelsList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setLevel(item.title)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    level === item.title
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  {level === item.title && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <Clock className="w-4 h-4" />
              <span>3-BOSQICH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 text-white">
              Kuniga qancha vaqt ajrata olasiz?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Muntazam kunlik 10-15 daqiqalik mashqlar eng yuqori natijani beradi
            </p>

            <div className="space-y-3">
              {timesList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setDailyTime(item.time)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    dailyTime === item.time
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.label}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  {dailyTime === item.time && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>4-BOSQICH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 text-white">
              Asosiy muammoingiz nima?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              AI ushbu kamchilikni bartaraf etishga mo'ljallangan mashqlarni birinchi o'ringa qo'yadi
            </p>

            <div className="space-y-3">
              {issuesList.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainIssue(item)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    mainIssue === item
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-semibold text-sm text-white">{item}</span>
                  {mainIssue === item && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <Sparkles className="w-4 h-4" />
              <span>5-BOSQICH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2 text-white">
              Shaxsiy AI Rejangiz Tayyorlanmoqda
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Siz tanlagan parametrlar asosida 7 kunlik amaliy diksiya va nutq dasturi shakllantirildi.
            </p>

            <div className="p-6 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-3 text-xs">
              <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                <span className="text-slate-400">Tanlangan Maqsad:</span>
                <span className="font-bold text-white capitalize">{goal.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                <span className="text-slate-400">Kunlik davomiylik:</span>
                <span className="font-bold text-cyan-300">{dailyTime} daqiqa</span>
              </div>
              <div className="flex justify-between border-b border-indigo-500/20 pb-2">
                <span className="text-slate-400">Asosiy Fokus:</span>
                <span className="font-bold text-amber-300">{mainIssue}</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800/80">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
            >
              Orqaga
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 rounded-xl gradient-button text-white font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <span>KEYINGISI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-xl gradient-button text-white font-extrabold text-sm flex items-center gap-2 shadow-xl"
            >
              <span>DASHBOARDGA O'TISH</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="py-4 text-center text-xs text-slate-500">
        © 2026 NUTQ AI — Vaysaqi AI Platform
      </div>
    </div>
  );
}
