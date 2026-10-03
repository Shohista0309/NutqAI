import { UserProfile, SpeechAnalysisResult, ExerciseItem, PlanDay, PitchQuestion } from '@/types';
import { analyzeUzbekSpeech } from '@/lib/ai/uzbekNlp';

const STORAGE_KEY_USER = 'nutq_ai_user_profile';
const STORAGE_KEY_SESSIONS = 'nutq_ai_sessions';

export const DEFAULT_USER: UserProfile = {
  id: 'usr-default-01',
  name: 'Jasur Bek',
  email: 'jasur@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  level: "O'rta daraja (Intermediate)",
  xp: 1450,
  streak: 5,
  dailyGoalMinutes: 15,
  goal: 'startup_pitch',
  mainIssue: "Juda tez gapirish va filler so'zlar",
  focusArea: 'Pitch hamda Prezentatsiyalar',
  joinedDate: '2026-09-15',
};

export const SAMPLE_TONGUE_TWISTERS: ExerciseItem[] = [
  {
    id: 'tt-1',
    title: "G'ani g'ildirakni g'ildiratdi",
    category: 'tongue-twister',
    difficulty: 'Oson',
    durationMinutes: 2,
    description: "'G'' va 'R' artikulyatsiya tovushlarini ravon va aniq aytish mashqi.",
    targetText: "G'ani g'ildirakni g meva bilan g'ildiratib, g'o'ra terdi. G'ozlar g'o'dillab g'isht ustida g'alati yugurdi.",
    instructions: [
      "Har bir so'zda 'g'' va 'r' harflarini jag' hamda til ildizida aniq bosing.",
      "Avval sekin va aniq, so'ngra tezlikni oshiring.",
      "10 daqiqa davomida 3 marta takrorlang."
    ]
  },
  {
    id: 'tt-2',
    title: "Tog'da to'g'ri to'ng'iz",
    category: 'tongue-twister',
    difficulty: "O'rta",
    durationMinutes: 3,
    description: "'T', 'G'' va 'NG' portlovchi tovushlar ustida ishlash.",
    targetText: "Tog'da to'g'ri to'ng'iz to'ng'izlar bilan to'xtamay to'qayzorda to'ng'iz to'pladi.",
    instructions: [
      "Lablar va til uchini tishlarga jipslashtirib talaffuz qiling.",
      "Pauzalarsiz bir nafasda aytishga harakat qiling."
    ]
  },
  {
    id: 'tt-3',
    title: 'Pichoqchi pichoqni pishitdi',
    category: 'tongue-twister',
    difficulty: 'Qiyin',
    durationMinutes: 4,
    description: "'P', 'CH', 'SH' tovushlarining artikulyatsiyasi.",
    targetText: "Pichoqchi pichoqni poypatsiz pishitib, pichoqqiron poygasida pichoqlarni charxladi.",
    instructions: [
      "P va CH tovushlarida havo oqimini keskin chiqaring.",
      "Ketma-ket 5 marta adashmay aytishga harakat qiling."
    ]
  },
  {
    id: 'tt-4',
    title: "Keksa kiyik ko'kat yedi",
    category: 'tongue-twister',
    difficulty: 'Professional',
    durationMinutes: 5,
    description: "Tez va uzluksiz diksiya imtihoni.",
    targetText: "Keksa kiyik ko'rimsiz ko'katni ko'rib, ko'lda ko'p ko'pchilik ko'z oldida ko'karib ketdi.",
    instructions: [
      "Professional spikerlar darajasida 180 WPM tezlikda adashmasdan talaffuz qiling."
    ]
  }
];

export const SAMPLE_READING_MATERIALS: ExerciseItem[] = [
  {
    id: 'read-1',
    title: 'Vatan — Erkin Vohidov',
    category: 'reading',
    difficulty: "O'rta",
    durationMinutes: 3,
    description: "She'riy ritm, pauzalar va emotsional urg'u berish mashqi.",
    targetText: `Vatan, to'rt fasling ham birday go'zaldir,
Har bitta giyohing bitmas g'azaldir.
Sening quchog'ingda o'sgan har inson,
Yuragi otashin, mehri azaldir.`,
    instructions: [
      "Har bir satr oxirida 1 soniyalik ritmik pauza qiling.",
      "'Go'zaldir' va 'G'azaldir' so'zlarida ovoz tonini ko'taring."
    ]
  },
  {
    id: 'read-2',
    title: 'Innovatsiyalar Kelajagi — Maqola',
    category: 'reading',
    difficulty: 'Qiyin',
    durationMinutes: 4,
    description: "Biznes va texnologiya matnini ravon, ishonchli va salmoqli o'qish.",
    targetText: `Sun'iy intellekt texnologiyalari zamonaviy dunyoda nafaqat ish unumdorligini oshirmoqda, balki insonlarning o'zaro muloqot madaniyatini ham tubdan o'zgartirmoqda. Bugun muvaffaqiyatli yetakchi bo'lish uchun g'oyani aniq, loqa va ishonchli yetkazib bera olish muhim ahamiyatga ega.`,
    instructions: [
      "Texnik atamalarni ('Sun'iy intellekt', 'unumdoriq') dona-dona va aniq talaffuz qiling.",
      "Tezlikni 145-155 WPM oralig'ida saqlang."
    ]
  }
];

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_USER;
  const data = localStorage.getItem(STORAGE_KEY_USER);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_USER));
    return DEFAULT_USER;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_USER;
  }
}

export function saveUserProfile(profile: Partial<UserProfile>): UserProfile {
  const current = getUserProfile();
  const updated = { ...current, ...profile };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
  }
  return updated;
}

export function getAllSessions(): SpeechAnalysisResult[] {
  if (typeof window === 'undefined') return getMockInitialSessions();
  const data = localStorage.getItem(STORAGE_KEY_SESSIONS);
  if (!data) {
    const initial = getMockInitialSessions();
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveSession(session: SpeechAnalysisResult): SpeechAnalysisResult[] {
  const sessions = getAllSessions();
  const updated = [session, ...sessions];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
  }
  const user = getUserProfile();
  saveUserProfile({
    xp: user.xp + 120,
    streak: user.streak + 1,
  });
  return updated;
}

export function getMockInitialSessions(): SpeechAnalysisResult[] {
  const demoTranscript1 = `Assalomu alaykum. Demak, bugun biz NUTQ AI loyihasini taqdim etmoqchimiz. Haligi, bilasizmi, juda ko'pchilik insonlar omma oldida gapirishda hayajonlanishadi va anaqa... so'zlarni unutib qo'yishadi. Bizning sun'iy intellekt murabbiyimiz esa har bir foydalanuvchiga ravon va ishonchli gapirishni o'rgatadi. Xullas, bu o'zbek tilidagi birinchi professional platforma.`;
  const demoTranscript2 = `Xurmatli investorlar, bizning loyihamiz o'zbek tilida nutq tahlilini amalga oshiradi. Masalan uchun, foydalanuvchi mikrofon orqali gapiradi, AI esa ravonlik, tezlik va filler so'zlarni aniqlab beradi. Biz 50 ming dollarlik bozor imkoniyatini ko'rmoqdamiz. Xulosa qilib aytganda, loyihamizga investitsiya kiritish juda istiqbolli.`;

  const s1 = analyzeUzbekSpeech(demoTranscript1, 45, 'pitch', 'Nutq AI Pitch');
  s1.date = new Date(Date.now() - 86400000 * 2).toISOString();

  const s2 = analyzeUzbekSpeech(demoTranscript2, 38, 'pitch', 'Investor Q&A');
  s2.date = new Date(Date.now() - 86400000 * 5).toISOString();

  return [s1, s2];
}

export function generate7DayPlan(goal: string, issue: string): PlanDay[] {
  return [
    {
      dayNumber: 1,
      title: "1-Kun: Artikulyatsiya va Ovoz qizdirish",
      focus: "Lab va til harakatchanligi, diksiyani ravon qilish",
      status: "completed",
      exercises: [
        {
          id: 'ex-101',
          title: "Lab va Jag' Mashqi",
          category: 'articulation',
          difficulty: 'Oson',
          durationMinutes: 5,
          description: "Jag' muskullarini bo'shashtirish va ovoz naychalarini tayyorlash.",
          instructions: ["Lablarni cho'zib O va U tovushlarini dona-dona aytish.", "5 marta chuqur nafas olib chiqarish."]
        },
        SAMPLE_TONGUE_TWISTERS[0]
      ]
    },
    {
      dayNumber: 2,
      title: "2-Kun: Filler so'zlardan qutulish",
      focus: "'Demak', 'haligi', 'eee' so'zlarini neytral pauzaga almashtirish",
      status: "current",
      exercises: [
        {
          id: 'ex-102',
          title: "Pauza va Sukunat Sinovi",
          category: 'free-speak',
          difficulty: "O'rta",
          durationMinutes: 3,
          description: "1 daqiqa davomida bitta ham filler so'z ishlatmasdan gapirish.",
          instructions: ["Mavzu: 'Sevimli kitobim haqida'.", "So'z topolmay qolganingizda to'xtab 1 soniya jim turing."]
        }
      ]
    },
    {
      dayNumber: 3,
      title: "3-Kun: Nutq Tempini Nazorat Qilish",
      focus: "140-155 WPM optimal tezlikka erishish",
      status: "locked",
      exercises: [
        SAMPLE_READING_MATERIALS[1]
      ]
    },
    {
      dayNumber: 4,
      title: "4-Kun: Mantiq va Dalillar Zanjiri",
      focus: "Kirish, 2 ta asosiy dalil va kuchli xulosa berish",
      status: "locked",
      exercises: [
        {
          id: 'ex-104',
          title: "Strukturali Nutq Yaratish",
          category: 'free-speak',
          difficulty: 'Qiyin',
          durationMinutes: 5,
          description: "2 daqiqada taqdimot matnini mantiqiy tartibda so'zlash.",
          instructions: ["1. Muammo (30s)", "2. Yechim va dalil (60s)", "3. Kuchli xulosa (30s)"]
        }
      ]
    },
    {
      dayNumber: 5,
      title: "5-Kun: Hayajonni Boshqarish va Ishonch",
      focus: "4-7-8 Nafas mashqi va auditoriya oldida muloqot",
      status: "locked",
      exercises: [
        {
          id: 'ex-105',
          title: "Nafas va Ovoz Quvvati",
          category: 'anxiety',
          difficulty: 'Oson',
          durationMinutes: 4,
          description: "Diafragma nafasi bilan sahnaga chiqishdan oldingi tayyorgarlik.",
          instructions: ["4s nafas olish, 7s ushlash, 8s asta chiqarish."]
        }
      ]
    },
    {
      dayNumber: 6,
      title: "6-Kun: Startup Pitch & Intervyu Simulatori",
      focus: "Savollarga qisqa, aniq va ta'sirchan javob berish",
      status: "locked",
      exercises: [
        {
          id: 'ex-106',
          title: "Pitch Q&A Interaktiv Mashq",
          category: 'pitch',
          difficulty: 'Qiyin',
          durationMinutes: 7,
          description: "AI investorning 5 ta ketma-ket savoliga javob berish.",
          instructions: ["Har bir javob 45 soniyadan oshmasin.", "Raqamlarga tayanib gapiring."]
        }
      ]
    },
    {
      dayNumber: 7,
      title: "7-Kun: Yakuniy Imtihon va Natija",
      focus: "Imtihon nutqi va haftalik rivojlanish darajasini baholash",
      status: "locked",
      exercises: [
        {
          id: 'ex-107',
          title: "Erkin Mavzuda 3 Daqiqalik Taqdimot",
          category: 'free-speak',
          difficulty: 'Professional',
          durationMinutes: 6,
          description: "Barcha ko'nikmalarni birlashtirgan holda 3 daqiqa ravon gapirish.",
          instructions: ["Sertifikat va haftalik rivojlanish hisobotini oling."]
        }
      ]
    }
  ];
}
