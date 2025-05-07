
export interface Routine {
  id: string;
  name: string;
  purpose: string;
  steps: string[];
  duration: string;
  science: string;
  iconName: string;
  tags: string[];
  detailedInstructions?: InstructionStep[];
}

export interface InstructionStep {
  text: string;
  durationSeconds: number;
}

export interface QuizState {
  // Slider questions (1-10)
  mentalClarity: number;
  energyLevel: number;
  stressLevel: number;
  preferQuickRoutine: number;
  needPhysicalRelaxation: number;
  
  // Yes/No questions
  needFocus: boolean;
  needVisualization: boolean;
  needPhysicalActivation: boolean;
  needEmotionalRegulation: boolean;
  wantColdExposure: boolean;
  needDistractionControl: boolean;
}

export interface ApiKeyState {
  openAiKey: string;
  elevenLabsKey: string;
  keyValidated: boolean;
  elevenLabsKeyValidated: boolean;
}

export interface AudioSettings {
  voiceoverEnabled: boolean;
  ambienceEnabled: boolean;
  selectedVoiceId: string;
  ambienceStyle: "zen-rain" | "calm-ocean" | "none";
  volume: number;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  preview_url: string;
}

export interface RoutineFeedback {
  routineId: string;
  rating: number;
  comment?: string;
  timestamp: Date;
}
