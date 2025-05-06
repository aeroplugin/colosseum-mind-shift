
import React, { createContext, useContext, useState } from "react";
import { QuizState, ApiKeyState, Routine } from "../types";
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
  updateApiKey: (key: string) => void;
  validateApiKey: () => Promise<boolean>;
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
  keyValidated: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [recommendedRoutine, setRecommendedRoutine] = useState<Routine | null>(null);
  const [apiKeyState, setApiKeyState] = useState<ApiKeyState>(defaultApiKeyState);

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

  const updateApiKey = (key: string) => {
    setApiKeyState(prev => ({ ...prev, openAiKey: key }));
  };

  const validateApiKey = async (): Promise<boolean> => {
    try {
      // Basic validation - in a real app, you'd make a test call to OpenAI API
      const isValid = apiKeyState.openAiKey.startsWith("sk-") && apiKeyState.openAiKey.length > 20;
      setApiKeyState(prev => ({ ...prev, keyValidated: isValid }));
      return isValid;
    } catch (error) {
      console.error("Error validating API key:", error);
      setApiKeyState(prev => ({ ...prev, keyValidated: false }));
      return false;
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
        validateApiKey
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
