
import { QuizState } from "../types";
import { routines } from "../data/routines";

export function determineRoutine(state: QuizState): string {
  // First, check for specific conditions that lead to clear recommendations
  
  // Cold Exposure First
  if (state.wantColdExposure) {
    return "cold-mind";
  }
  
  // Physical Relaxation Priority
  if (state.needPhysicalRelaxation >= 7) {
    return "jaw-unlock";
  }
  
  // Stress + Focus Combo
  if (state.stressLevel >= 7 && state.needFocus) {
    if (state.mentalClarity <= 5) {
      return "precision-reset";
    } else {
      return "focus-injector"; // Physiological Sigh + Eye Lock
    }
  }
  
  // Emotional Regulation
  if (state.needEmotionalRegulation) {
    if (state.stressLevel >= 5) {
      return "dichotomy-cut"; // Stoic reframe
    }
    if (state.energyLevel <= 5) {
      return "micro-win"; // Celebration
    }
    return "sutra-selector"; // AI mantra
  }
  
  // Energy/Activation Needs
  if (state.needPhysicalActivation || state.energyLevel <= 3) {
    if (state.needVisualization) {
      return "inner-sprint"; // Visualization
    } else {
      return "micro-win"; // Quick energy boost
    }
  }
  
  // Distraction Control
  if (state.needDistractionControl) {
    return "strike-clarity";
  }
  
  // Visualization Preference
  if (state.needVisualization) {
    if (state.needEmotionalRegulation) {
      return "emotional-mask"; // Add this to routines
    }
    if (state.needFocus) {
      return "strike-clarity";
    }
  }
  
  // Deep Practice Preference
  if (state.preferQuickRoutine <= 3) { // Inverted scale - lower means deeper practice
    return "nothingness-reset"; // Add this to routines
  }
  
  // Default
  return "sutra-selector";
}

export function getRoutineById(id: string) {
  return routines.find(routine => routine.id === id) || routines[0];
}
