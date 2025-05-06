
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
  keyValidated: boolean;
}

export interface RoutineFeedback {
  routineId: string;
  rating: number;
  comment?: string;
  timestamp: Date;
}
