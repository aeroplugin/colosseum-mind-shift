export type Routine = {
  id: string;
  name: string;
  purpose: string;
  steps: string[];
  duration: string;
  science: string;
  iconName: string;
  tags: string[];
  detailedInstructions: InstructionStep[];
};

export type InstructionStep = {
  text: string;
  durationSeconds: number;
};

export type AudioSettings = {
  voiceoverEnabled: boolean;
  ambienceEnabled: boolean;
  ambienceStyle: string;
  volume: number;
  selectedVoiceId: string | null;
};

export type ApiKeyState = {
  openAiKey: string;
  elevenLabsKey: string;
  keyValidated: boolean;
  elevenLabsKeyValidated: boolean;
};

// Add type for OpenAI Dichotomy Cut analysis
export type DichotomyCutAnalysis = {
  controllable: string[];
  uncontrollable: string[];
  recommendation: string;
};

// Add missing QuizState type
export type QuizState = {
  mentalClarity: number;
  energyLevel: number;
  stressLevel: number;
  preferQuickRoutine: number;
  needPhysicalRelaxation: number;
  needFocus: boolean;
  needVisualization: boolean;
  needPhysicalActivation: boolean;
  needEmotionalRegulation: boolean;
  wantColdExposure: boolean;
  needDistractionControl: boolean;
};

// Add missing ElevenLabsVoice type
export type ElevenLabsVoice = {
  voice_id: string;
  name: string;
  category?: string;
  description?: string;
  preview_url?: string;
};

// Add types for Dual N-Back game
export type DualNBackSettings = {
  nLevel: 1 | 2 | 3;
  useVoice: boolean;
  duration: number;
};

export type DualNBackScore = {
  visualCorrect: number;
  visualIncorrect: number;
  audioCorrect: number;
  audioIncorrect: number;
  totalTrials: number;
  visualAccuracy: number;
  audioAccuracy: number;
  overallAccuracy: number;
};

// Add types for Stroop Tap game
export type StroopTapSettings = {
  matchType: 'colorMatchesWord' | 'wordMatchesColor';
  duration: number;
  useVoicePrompt: boolean;
};

export type StroopTapScore = {
  correctTaps: number;
  incorrectTaps: number;
  missedMatches: number;
  totalTrials: number;
  accuracy: number;
  averageReactionTime: number; // in ms
};

export type StroopItem = {
  word: string;
  color: string;
  isMatch: boolean;
};

// Add type for Cognitive Switch game scores
export type CognitiveSwitchScore = {
  mathTap: {
    correct: number;
    incorrect: number;
    total: number;
    averageReactionTime: number;
  };
  colorWordTap: {
    correct: number;
    incorrect: number;
    total: number;
    averageReactionTime: number;
  };
  shapeCount: {
    correct: number;
    incorrect: number;
    total: number;
    averageReactionTime: number;
  };
  oddEvenSwitch: {
    correct: number;
    incorrect: number;
    total: number;
    averageReactionTime: number;
  };
  totalCorrect: number;
  totalQuestions: number;
  overallAccuracy: number;
  averageReactionTime: number;
};

export type CognitiveGameType = 'dualNBack' | 'stroopTap' | 'cognitiveSwitch';

export type CognitiveGameState = {
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  score: DualNBackScore | StroopTapScore | CognitiveSwitchScore;
  gameType: CognitiveGameType;
};
