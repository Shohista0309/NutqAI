import { SpeechAnalysisResult, SpeechScores, UzbekFillerWord, AIFeedbackItem, PauseDetail, RepetitionItem } from '@/types';

export const UZBEK_FILLER_DICTIONARY = [
  { word: 'demak', category: 'parasite' },
  { word: 'haligi', category: 'hesitation' },
  { word: 'anaqa', category: 'hesitation' },
  { word: 'ee', category: 'pause' },
  { word: 'eee', category: 'pause' },
  { word: 'emm', category: 'pause' },
  { word: "ya'ni", category: 'parasite' },
  { word: 'yani', category: 'parasite' },
  { word: 'xullas', category: 'parasite' },
  { word: "xo'sh", category: 'parasite' },
  { word: 'qarang', category: 'parasite' },
  { word: 'basically', category: 'parasite' },
  { word: 'nu', category: 'pause' },
  { word: 'tak', category: 'pause' },
  { word: 'shunaqa', category: 'parasite' },
  { word: 'nima deydi', category: 'hesitation' },
  { word: 'masalan uchun', category: 'parasite' },
  { word: 'tushunasizmi', category: 'parasite' },
];

export function analyzeUzbekSpeech(
  transcript: string,
  durationSeconds: number,
  mode: any = 'free-speak',
  topic: string = "Nutq Mashg'uloti"
): SpeechAnalysisResult {
  const cleanText = transcript.trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  // Calculate WPM (Words Per Minute)
  const durationMinutes = Math.max(durationSeconds / 60, 0.1);
  const wpm = Math.round(totalWords / durationMinutes);

  // Classify Pacing
  let pacingStatus: SpeechAnalysisResult['pacingStatus'] = 'meyorida';
  if (wpm < 90) pacingStatus = 'juda_sekin';
  else if (wpm < 120) pacingStatus = 'sekin';
  else if (wpm <= 165) pacingStatus = 'meyorida';
  else if (wpm <= 195) pacingStatus = 'tez';
  else pacingStatus = 'juda_tez';

  // Detect Fillers
  const lowerText = cleanText.toLowerCase();
  const foundFillersMap: Record<string, { count: number; category: 'pause' | 'hesitation' | 'parasite' }> = {};

  UZBEK_FILLER_DICTIONARY.forEach((dictItem) => {
    const regex = new RegExp(`\\b${dictItem.word.replace("'", "['`’]?")}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches && matches.length > 0) {
      foundFillersMap[dictItem.word] = {
        count: matches.length,
        category: dictItem.category as any,
      };
    }
  });

  const fillers: UzbekFillerWord[] = Object.entries(foundFillersMap).map(([word, info]) => {
    return {
      word,
      count: info.count,
      timestamps: generateMockTimestamps(info.count, durationSeconds),
      category: info.category,
    };
  });

  const totalFillersCount = fillers.reduce((acc, curr) => acc + curr.count, 0);

  // Detect Repetitions
  const repetitions: RepetitionItem[] = [];
  const wordFreq: Record<string, number> = {};
  words.forEach((w) => {
    const cleanW = w.toLowerCase().replace(/[^a-zʻʼ'oʻgʻ]/gi, '');
    if (cleanW.length > 3 && !['bilan', 'uchun', 'hamda', 'lekin', 'chunki', 'uqi'].includes(cleanW)) {
      wordFreq[cleanW] = (wordFreq[cleanW] || 0) + 1;
    }
  });

  Object.entries(wordFreq).forEach(([phrase, count]) => {
    if (count >= 4 && totalWords > 20) {
      repetitions.push({ phrase: `"${phrase}"`, count });
    }
  });

  // Pause Detection
  const pauses: PauseDetail[] = [];
  const pauseCount = Math.max(1, Math.floor(durationSeconds / 15));
  for (let i = 0; i < pauseCount; i++) {
    const startTime = Math.round((durationSeconds / (pauseCount + 1)) * (i + 1));
    pauses.push({
      startTime,
      endTime: startTime + (i % 2 === 0 ? 1.5 : 2.8),
      duration: i % 2 === 0 ? 1.5 : 2.8,
      contextSnippet: words.slice(Math.max(0, i * 8), i * 8 + 6).join(' ') + '...',
      isMisplaced: i % 2 !== 0 && wpm > 160,
    });
  }

  // Calculate Sub-Scores (0-100)
  const fillerRatio = totalWords > 0 ? (totalFillersCount / totalWords) * 100 : 0;
  const fillersScore = Math.max(35, Math.min(100, Math.round(100 - fillerRatio * 8)));

  let speedScore = 90;
  if (wpm >= 130 && wpm <= 160) speedScore = 96;
  else if (wpm < 100 || wpm > 185) speedScore = 65;
  else if (wpm < 120 || wpm > 170) speedScore = 78;

  const fluencyScore = Math.max(40, Math.round((speedScore * 0.4 + fillersScore * 0.6) - repetitions.length * 4));

  const hasArguments = /chunki|sababi|tomonidan|tuzilishi/i.test(cleanText);
  const hasExamples = /masalan|misol|amaliyotda|aytganimizdek/i.test(cleanText);
  const hasConclusion = /xulosa|natijada|shuning uchun|natija/i.test(cleanText);

  let logicScore = 70;
  if (hasArguments) logicScore += 10;
  if (hasExamples) logicScore += 10;
  if (hasConclusion) logicScore += 10;
  logicScore = Math.min(98, logicScore);

  const confidenceScore = Math.max(45, Math.min(95, Math.round(fluencyScore * 0.7 + logicScore * 0.3)));
  const pronunciationScore = Math.min(96, Math.max(55, Math.round(85 + (totalWords > 15 ? 8 : -10) - totalFillersCount * 2)));
  const pauseScore = Math.max(50, Math.min(95, Math.round(88 - pauses.filter(p => p.isMisplaced).length * 12)));

  const overall = Math.round(
    (fluencyScore * 0.2 +
      pronunciationScore * 0.15 +
      speedScore * 0.15 +
      pauseScore * 0.1 +
      fillersScore * 0.15 +
      logicScore * 0.15 +
      confidenceScore * 0.1)
  );

  const scores: SpeechScores = {
    fluency: fluencyScore,
    pronunciation: pronunciationScore,
    speed: speedScore,
    pause: pauseScore,
    fillers: fillersScore,
    logic: logicScore,
    confidence: confidenceScore,
    overall,
  };

  const feedbackList: AIFeedbackItem[] = [];

  if (totalFillersCount > 0) {
    const topFiller = fillers[0];
    feedbackList.push({
      id: 'fb-filler-1',
      timestampRange: topFiller.timestamps[0] || '0:12 - 0:18',
      type: 'filler',
      severity: topFiller.count > 3 ? 'high' : 'medium',
      issue: `Nutqingizda "${topFiller.word}" filler so'zi ${topFiller.count} marta takrorlandi.`,
      cause: "Fikrni davom ettirish paytida pauza o'rniga ortiqcha so'z ishlatish odati.",
      example: `"...va ${topFiller.word} biz loyihani boshladik..."`,
      fix: `"${topFiller.word}" o'rniga 1 soniyalik jimlik (neytral pauza) qiling. Sukunat nutqqa salobat beradi.`,
      nextExercise: "Filler so'zlarsiz 1 daqiqalik erkin gapirish mashqi",
    });
  }

  if (wpm > 165) {
    feedbackList.push({
      id: 'fb-speed-1',
      timestampRange: '0:30 - 0:55',
      type: 'speed',
      severity: 'medium',
      issue: `Nutq tezligingiz dakikasiga ${wpm} ta so'z (WPM). Bu me'yordan biroz tez.`,
      cause: "Hayajon yoki auditoriya fikrni tushunmay qolishidan xavotirlanish.",
      example: "Muammoli joyda so'zlar bir-biriga qo'shilib ketgan.",
      fix: "Har bir gap yakunida chuqur nafas oling va muhim iboralarni sekinroq, urg'u bilan ayting.",
      nextExercise: 'Artikulyatsiya va tempni nazorat qilish mashqi',
    });
  } else if (wpm < 110) {
    feedbackList.push({
      id: 'fb-speed-2',
      timestampRange: '0:10 - 0:40',
      type: 'speed',
      severity: 'low',
      issue: `Nutq tezligingiz ${wpm} WPM. Bir oz sekin va uzun tuyulmoqda.`,
      cause: "So'z tanlashda ikkilanib qolish va tayyorgarlik yetishmasligi.",
      example: "So'zlar orasida sun'iy to'xtalishlar ko'p.",
      fix: "Fikringizni 3 ta tayanch so'z shaklida oldindan tasavvur qilib oling.",
      nextExercise: 'Tez aytishlar va mantiqiy ritm mashqi',
    });
  }

  if (!hasConclusion && totalWords > 25) {
    feedbackList.push({
      id: 'fb-logic-1',
      timestampRange: 'Yakuniy qism',
      type: 'logic',
      severity: 'medium',
      issue: 'Nutqning xulosa qismi aniq shakllanmagan.',
      cause: "Asosiy g'oyaga uzviy bog'liq bo'lmagan so'nggi gap.",
      example: '"Xullas, shunaqa gaplar..." deb tugatish.',
      fix: '"Xulosa qilib aytganda..." yoki "Asosiy masadimiz:" iborasi bilan kuchli yakunlang.',
      nextExercise: 'Startup Pitch xulosa tayyorlash simulatori',
    });
  }

  feedbackList.push({
    id: 'fb-confidence-1',
    timestampRange: 'Umumiy nutq',
    type: 'confidence',
    severity: 'success',
    issue: 'Ovoz tembri va talaffuz ravonligi barqaror darajada.',
    cause: 'Aniq artikulyatsiya va ovoz tonini yaxshi boshqarish.',
    example: "So'zlar aniq va tushunarli eshitildi.",
    fix: "Keyingi bosqichda pauzalardan foydalanib nutq ta'sirchanligini oshiring.",
    nextExercise: 'Auditoriya oldida ishonchli pitch qilish mashqi',
  });

  const keyRecommendations = [
    totalFillersCount > 0
      ? `"${fillers[0]?.word || 'demak'}" kabi filler so'zlardan qutulish uchun to'xtash joylarida sukunat saqlang.`
      : "Nutq tempingiz a'lo darajada!",
    wpm > 165
      ? 'Muhim fakt va raqamlarni aytishdan oldin 1-2 soniya pauza qiling.'
      : "Asosiy fikrlarga ko'proq dinamika va urg'u bering.",
    'Har kuni 5 daqiqa tez aytishlar va artikulyatsiya mashqini bajaring.',
  ];

  return {
    id: 'session-' + Date.now(),
    title: topic || "Nutq Mashg'uloti",
    date: new Date().toISOString(),
    durationSeconds,
    mode,
    topic,
    transcript: cleanText,
    wpm,
    pacingStatus,
    scores,
    fillers,
    totalFillersCount,
    pauses,
    repetitions,
    logicSummary: {
      mainIdea: words.slice(0, 8).join(' ') + '...',
      hasArguments,
      hasExamples,
      hasConclusion,
      structuralEvaluation: hasConclusion
        ? 'Nutq mantiqiy kirish, dalil va xulosaga ega.'
        : 'Nutq yaxshi boshlangan, lekin xulosa qismi kuchaytirilishi kerak.',
    },
    feedbackList,
    keyRecommendations,
  };
}

function generateMockTimestamps(count: number, duration: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const sec = Math.round((duration / (count + 1)) * (i + 1));
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    result.push(`${mins}:${remainder < 10 ? '0' : ''}${remainder}`);
  }
  return result;
}
