
import { QuizState } from "../types";
import { routines } from "../data/routines";

export function determineRoutine(state: QuizState): string {
  // First, check for specific conditions that lead to clear recommendations
  if (state.wantColdExposure) {
    return "cold-mind";
  }
  
  if (state.needPhysicalRelaxation >= 7) {
    return "jaw-unlock";
  }
  
  if (state.stressLevel >= 8 && state.needEmotionalRegulation) {
    return "focus-injector";
  }
  
  if (state.needVisualization && state.needPhysicalActivation) {
    return "inner-sprint";
  }
  
  if (state.needFocus && state.stressLevel <= 5) {
    return "precision-reset";
  }
  
  if (state.mentalClarity <= 4 && state.energyLevel <= 4) {
    return "sutra-selector";
  }
  
  if (state.needEmotionalRegulation && !state.needPhysicalActivation) {
    return "dichotomy-cut";
  }
  
  if (state.needDistractionControl && state.mentalClarity <= 5) {
    return "strike-clarity";
  }
  
  if (state.energyLevel <= 3) {
    return "micro-win";
  }
  
  // Default to precision reset if no clear match
  return "precision-reset";
}

export function getRoutineById(id: string) {
  return routines.find(routine => routine.id === id) || routines[0];
}
