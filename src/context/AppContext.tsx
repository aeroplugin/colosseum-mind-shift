import React, { createContext, useContext, useState, useEffect } from "react";
import { QuizState, ApiKeyState, Routine, AudioSettings, ElevenLabsVoice } from "../types";
import { determineRoutine, getRoutineById } from "../utils/quizLogic";

interface AppContextType {
  // Quiz state
  quizState: QuizState;
  updateQuizState: (updates: Partial<QuizState>) => void;
  resetQuiz: () => void;
  
  // Routine state
  recommendedRoutine: Routine | null;
  setRecommendedRoutine: (routine: Routine) => void;
  getRecommendation: () => void;
  
  // API key state
  apiKeyState: ApiKeyState;
  updateApiKey: (key: string, type: 'openai' | 'elevenlabs') => void;
  validateApiKey: (type: 'openai' | 'elevenlabs') => Promise<boolean>;
  
  // Audio settings
  audioSettings: AudioSettings;
  updateAudioSettings: (updates: Partial<AudioSettings>) => void;
  availableVoices: ElevenLabsVoice[];
  fetchVoices: () => Promise<void>;
}

const defaultQuizState: QuizState = {
  mentalClarity: 5,
  energyLevel: 5,
  stressLevel: 5,
  preferQuickRoutine: 5,
  needPhysicalRelaxation: 5,
  needFocus: false,
  needVisualization: false,
  needPhysicalActivation: false,
  needEmotionalRegulation: false,
  wantColdExposure: false,
  needDistractionControl: false
};

const defaultApiKeyState: ApiKeyState = {
  openAiKey: "",
  elevenLabsKey: "",
  keyValidated: false,
  elevenLabsKeyValidated: false
};

const defaultAudioSettings: AudioSettings = {
  voiceoverEnabled: true,
  ambienceEnabled: true,
  selectedVoiceId: "",
  ambienceStyle: "zen-rain",
  volume: 0.8
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const saved = localStorage.getItem('quizState');
    return saved ? JSON.parse(saved) : defaultQuizState;
  });
  
  const [recommendedRoutine, setRecommendedRoutine] = useState<Routine | null>(null);
  const [apiKeyState, setApiKeyState] = useState<ApiKeyState>(() => {
    const saved = localStorage.getItem('apiKeyState');
    return saved ? JSON.parse(saved) : defaultApiKeyState;
  });
  
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(() => {
    const saved = localStorage.getItem('audioSettings');
    return saved ? JSON.parse(saved) : defaultAudioSettings;
  });
  
  const [availableVoices, setAvailableVoices] = useState<ElevenLabsVoice[]>([]);

  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(quizState));
  }, [quizState]);

  useEffect(() => {
    localStorage.setItem('apiKeyState', JSON.stringify(apiKeyState));
  }, [apiKeyState]);

  useEffect(() => {
    localStorage.setItem('audioSettings', JSON.stringify(audioSettings));
  }, [audioSettings]);

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }));
  };

  const resetQuiz = () => {
    setQuizState(defaultQuizState);
    setRecommendedRoutine(null);
  };

  const getRecommendation = () => {
    const routineId = determineRoutine(quizState);
    const routine = getRoutineById(routineId);
    setRecommendedRoutine(routine);
  };

  const updateApiKey = (key: string, type: 'openai' | 'elevenlabs') => {
    setApiKeyState(prev => ({
      ...prev,
      [type === 'openai' ? 'openAiKey' : 'elevenLabsKey']: key,
      [type === 'openai' ? 'keyValidated' : 'elevenLabsKeyValidated']: false
    }));
  };

  const validateApiKey = async (type: 'openai' | 'elevenlabs'): Promise<boolean> => {
    try {
      if (type === 'openai') {
        const isValid = apiKeyState.openAiKey.startsWith("sk-") && apiKeyState.openAiKey.length > 20;
        setApiKeyState(prev => ({ ...prev, keyValidated: isValid }));
        return isValid;
      } else {
        // Validate ElevenLabs key
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
          headers: {
            'xi-api-key': apiKeyState.elevenLabsKey
          }
        });
        
        const isValid = response.ok;
        setApiKeyState(prev => ({ ...prev, elevenLabsKeyValidated: isValid }));
        
        if (isValid) {
          const data = await response.json();
          setAvailableVoices(data.voices);
        }
        
        return isValid;
      }
    } catch (error) {
      console.error(`Error validating ${type} API key:`, error);
      setApiKeyState(prev => ({
        ...prev,
        [type === 'openai' ? 'keyValidated' : 'elevenLabsKeyValidated']: false
      }));
      return false;
    }
  };

  const updateAudioSettings = (updates: Partial<AudioSettings>) => {
    setAudioSettings(prev => ({ ...prev, ...updates }));
  };

  const fetchVoices = async () => {
    if (!apiKeyState.elevenLabsKey || !apiKeyState.elevenLabsKeyValidated) {
      return;
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKeyState.elevenLabsKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableVoices(data.voices);
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        quizState,
        updateQuizState,
        resetQuiz,
        recommendedRoutine,
        setRecommendedRoutine,
        getRecommendation,
        apiKeyState,
        updateApiKey,
        validateApiKey,
        audioSettings,
        updateAudioSettings,
        availableVoices,
        fetchVoices
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};