export type ExerciseCategory = 
  | 'articulation'
  | 'tongue-twister'
  | 'reading'
  | 'dialogue'
  | 'free-speak'
  | 'pitch'
  | 'anxiety';

export type UserGoal = 
  | 'startup_pitch'
  | 'job_interview'
  | 'presentation'
  | 'daily_communication'
  | 'public_speaking'
  | 'pronunciation'
  | 'fluency';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  level: string;
  xp: number;
  streak: number;
  dailyGoalMinutes: number;
  goal: UserGoal;
  mainIssue: string;
  focusArea: string;
  joinedDate: string;
}

export interface OnboardingData {
  goal: UserGoal;
  level: string;
  dailyTime: number; // minutes
  mainIssue: string;
  focusArea: string;
}

export interface UzbekFillerWord {
  word: string;
  count: number;
  timestamps: string[];
  category: 'pause' | 'hesitation' | 'parasite';
}

export interface PauseDetail {
  startTime: number;
  endTime: number;
  duration: number; // seconds
  contextSnippet: string;
  isMisplaced: boolean;
}

export interface RepetitionItem {
  phrase: string;
  count: number;
}

export interface SpeechScores {
  fluency: number;      // Ravonlik (0-100)
  pronunciation: number; // Talaffuz (0-100)
  speed: number;        // Tezlik (0-100)
  pause: number;        // Pauza (0-100)
  fillers: number;      // Fillerlar (0-100)
  logic: number;        // Mantiq (0-100)
  confidence: number;   // Ishonchlilik (0-100)
  overall: number;      // Umumiy (0-100)
}

export interface AIFeedbackItem {
  id: string;
  timestampRange?: string; // e.g., "0:14 - 0:20"
  type: 'filler' | 'speed' | 'pause' | 'logic' | 'confidence' | 'pronunciation';
  severity: 'high' | 'medium' | 'low' | 'success';
  issue: string;
  cause: string;
  example: string;
  fix: string;
  nextExercise: string;
}

export interface SpeechAnalysisResult {
  id: string;
  title: string;
  date: string;
  durationSeconds: number;
  mode: ExerciseCategory;
  topic?: string;
  audioBlobUrl?: string;
  transcript: string;
  wpm: number;
  pacingStatus: 'juda_sekin' | 'sekin' | 'meyorida' | 'tez' | 'juda_tez';
  scores: SpeechScores;
  fillers: UzbekFillerWord[];
  totalFillersCount: number;
  pauses: PauseDetail[];
  repetitions: RepetitionItem[];
  logicSummary: {
    mainIdea: string;
    hasArguments: boolean;
    hasExamples: boolean;
    hasConclusion: boolean;
    structuralEvaluation: string;
  };
  feedbackList: AIFeedbackItem[];
  keyRecommendations: string[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  category: ExerciseCategory;
  difficulty: 'Oson' | 'O\'rta' | 'Qiyin' | 'Professional';
  durationMinutes: number;
  description: string;
  targetText?: string;
  instructions: string[];
  tips?: string[];
  sampleAudio?: string;
}

export interface PlanDay {
  dayNumber: number;
  title: string;
  focus: string;
  status: 'completed' | 'current' | 'locked';
  exercises: ExerciseItem[];
  scoreRequirement?: number;
}

export interface DialogueTurn {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  analysis?: Partial<SpeechAnalysisResult>;
}

export interface PitchQuestion {
  id: number;
  category: 'Problem' | 'Solution' | 'Market' | 'BusinessModel' | 'Team' | 'Future';
  question: string;
  contextHint: string;
}
