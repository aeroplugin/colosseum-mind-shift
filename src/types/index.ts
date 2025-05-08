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
