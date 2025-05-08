
import React, { useState, useEffect, useRef } from "react";
import { StroopTapScore, StroopTapSettings, StroopItem } from "@/types";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { audioService } from "@/services/audioService";
import { useAppContext } from "@/context/AppContext";
import { Check, X, Play, Pause, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface StroopTapGameProps {
  onComplete: (score: StroopTapScore) => void;
  settings?: Partial<StroopTapSettings>;
}

// Define colors used in the game
const COLORS = [
  { name: 'red', hex: '#e53e3e' },
  { name: 'blue', hex: '#3182ce' },
  { name: 'green', hex: '#38a169' },
  { name: 'yellow', hex: '#d69e2e' },
  { name: 'purple', hex: '#805ad5' }
];

// Generate a random Stroop item
const generateStroopItem = (matchType: StroopTapSettings['matchType']): StroopItem => {
  // Random indexes for word and color
  const wordIndex = Math.floor(Math.random() * COLORS.length);
  
  // Decide if this should be a match (20% probability)
  const shouldMatch = Math.random() < 0.2;
  
  let colorIndex;
  if (shouldMatch) {
    colorIndex = wordIndex; // Match
  } else {
    // Generate a different color index
    do {
      colorIndex = Math.floor(Math.random() * COLORS.length);
    } while (colorIndex === wordIndex);
  }
  
  return {
    word: COLORS[wordIndex].name,
    color: COLORS[colorIndex].hex,
    isMatch: shouldMatch
  };
};

export default function StroopTapGame({ onComplete, settings = {} }: StroopTapGameProps) {
  // Game settings with defaults
  const gameSettings: StroopTapSettings = {
    matchType: settings.matchType || 'colorMatchesWord',
    duration: settings.duration || 60, // 60 seconds by default
    useVoicePrompt: settings.useVoicePrompt !== undefined ? settings.useVoicePrompt : true
  };

  // Game state
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(gameSettings.duration);
  const [currentItem, setCurrentItem] = useState<StroopItem | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState<boolean>(false);
  
  // Score tracking
  const [score, setScore] = useState<StroopTapScore>({
    correctTaps: 0,
    incorrectTaps: 0,
    missedMatches: 0,
    totalTrials: 0,
    accuracy: 0,
    averageReactionTime: 0
  });

  // Refs for timing and rounds
  const itemTimer = useRef<NodeJS.Timeout | null>(null);
  const reactionStartTime = useRef<number>(0);
  const reactionTimes = useRef<number[]>([]);

  // Get audio settings from context
  const { apiKeyState, audioSettings } = useAppContext();

  // Start the game
  const startGame = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeRemaining(gameSettings.duration);
    resetScore();
    reactionTimes.current = [];
    startNewTrial();
  };

  // Reset the score
  const resetScore = () => {
    setScore({
      correctTaps: 0,
      incorrectTaps: 0,
      missedMatches: 0,
      totalTrials: 0,
      accuracy: 0,
      averageReactionTime: 0
    });
  };

  // Handle tap button click
  const handleTap = () => {
    if (!isActive || isPaused || !currentItem) return;
    
    // Record reaction time
    const reactionTime = performance.now() - reactionStartTime.current;
    reactionTimes.current.push(reactionTime);
    
    // Check if tap was correct (user should tap only if it's a match)
    const isCorrect = currentItem.isMatch;
    
    if (isCorrect) {
      setScore(prev => ({
        ...prev,
        correctTaps: prev.correctTaps + 1
      }));
      setFeedbackCorrect(true);
    } else {
      setScore(prev => ({
        ...prev,
        incorrectTaps: prev.incorrectTaps + 1
      }));
      setFeedbackCorrect(false);
    }
    
    setShowFeedback(true);
    
    // Clear current item and feedback after a short delay
    clearTimeout(itemTimer.current);
    setTimeout(() => {
      setShowFeedback(false);
      setCurrentItem(null);
      
      // Start next trial after a short delay
      setTimeout(() => {
        if (isActive && !isPaused) {
          startNewTrial();
        }
      }, 300);
    }, 500);
  };

  // Start a new trial
  const startNewTrial = async () => {
    // Generate a new Stroop item
    const newItem = generateStroopItem(gameSettings.matchType);
    setCurrentItem(newItem);
    
    // Record start time for reaction time measurement
    reactionStartTime.current = performance.now();
    
    // Update total trials
    setScore(prev => ({
      ...prev,
      totalTrials: prev.totalTrials + 1
    }));
    
    // Optional voice prompt
    if (gameSettings.useVoicePrompt && apiKeyState.elevenLabsKeyValidated && audioSettings.selectedVoiceId) {
      try {
        const promptText = newItem.isMatch ? "Match" : "No match";
        const audioUrl = await audioService.generateVoiceover(
          promptText, 
          apiKeyState.elevenLabsKey, 
          audioSettings.selectedVoiceId
        );
        const audio = new Audio(audioUrl);
        audio.volume = audioSettings.volume;
        audio.play();
      } catch (error) {
        console.error('Failed to generate voice prompt:', error);
      }
    }
    
    // Auto-advance to next item after 1.5 seconds (if user doesn't tap)
    itemTimer.current = setTimeout(() => {
      // If the item was a match and user didn't tap, count as missed
      if (newItem.isMatch) {
        setScore(prev => ({
          ...prev,
          missedMatches: prev.missedMatches + 1
        }));
      }
      
      // Clear current item
      setCurrentItem(null);
      
      // Start next trial after a short delay
      setTimeout(() => {
        if (isActive && !isPaused) {
          startNewTrial();
        }
      }, 300);
    }, 1500);
  };

  // Toggle pause state
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Calculate final score when game ends
  const calculateFinalScore = () => {
    const totalAttempts = score.correctTaps + score.incorrectTaps;
    const accuracy = totalAttempts > 0 ? (score.correctTaps / totalAttempts) * 100 : 0;
    
    // Calculate average reaction time
    const avgReactionTime = reactionTimes.current.length > 0 
      ? reactionTimes.current.reduce((a, b) => a + b, 0) / reactionTimes.current.length 
      : 0;
    
    return {
      ...score,
      accuracy,
      averageReactionTime: avgReactionTime
    };
  };

  // End the game
  const endGame = () => {
    setIsActive(false);
    if (itemTimer.current) {
      clearTimeout(itemTimer.current);
    }
    const finalScore = calculateFinalScore();
    setScore(finalScore);
    onComplete(finalScore);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      endGame();
      toast({
        title: "Game Over!",
        description: "You've completed the Stroop Tap challenge.",
      });
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (itemTimer.current) {
        clearTimeout(itemTimer.current);
      }
    };
  }, []);

  // Calculate progress percentage
  const progressPercent = ((gameSettings.duration - timeRemaining) / gameSettings.duration) * 100;

  // Get instruction text based on match type
  const instructionText = gameSettings.matchType === 'colorMatchesWord'
    ? "Tap ONLY if the text color matches the word."
    : "Tap ONLY if the word matches its text color.";

  return (
    <div className="flex flex-col items-center bg-[#121212] text-white p-6 min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-[#D8C5A3]">1-Minute Focus Reset</h1>
        <p className="mb-6 text-[#B3B3B3]">{instructionText}</p>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-[#2A2A2A] rounded-full mb-6">
          <div 
            className="h-full bg-[#004F2D] rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        {/* Timer */}
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">{timeRemaining}</span>
          <span className="text-[#B3B3B3]"> seconds</span>
        </div>
        
        {!isActive ? (
          <div className="flex flex-col gap-4 items-center mb-8">
            <p className="text-center mb-4">
              You'll see color words displayed in different colors. {instructionText}
            </p>
            <PrimaryButton 
              onClick={startGame} 
              className="w-full flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" /> Start Challenge
            </PrimaryButton>
            
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={() => onComplete(score)}
                variant="outline" 
                className="text-[#D8C5A3] border-[#D8C5A3] hover:bg-[#D8C5A3]/10"
              >
                Go Back
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Color word display */}
            <div className="flex justify-center items-center h-48 mb-8">
              {currentItem ? (
                <div 
                  className="text-6xl font-bold relative transition-all transform animate-pulse"
                  style={{ color: currentItem.color }}
                >
                  {currentItem.word.toUpperCase()}
                  
                  {showFeedback && (
                    <div className="absolute -top-10 right-0 text-4xl">
                      {feedbackCorrect ? (
                        <Check className="text-green-500" />
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-4xl text-[#2A2A2A]">...</div>
              )}
            </div>
            
            {/* Tap button */}
            <div className="mb-8 w-full">
              <PrimaryButton 
                onClick={handleTap}
                className="w-full py-8 text-xl"
              >
                Tap if Match
              </PrimaryButton>
            </div>
            
            {/* Controls */}
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                onClick={togglePause}
                className="p-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-full"
              >
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </Button>
              <Button
                onClick={() => {
                  resetScore();
                  startGame();
                }}
                className="p-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-full"
              >
                <RefreshCw className="w-6 h-6" />
              </Button>
            </div>
          </>
        )}
        
        {/* Score display */}
        {!isActive && score.totalTrials > 0 && (
          <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2A2A2A] mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#D8C5A3]">Your Results</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span>{score.accuracy.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Reaction Time:</span>
                <span>{score.averageReactionTime.toFixed(0)} ms</span>
              </div>
              <div className="h-px bg-[#2A2A2A] my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Executive Focus Score:</span>
                <span>
                  {Math.round((score.accuracy + (500 / (score.averageReactionTime || 1)) * 20) / 2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#B3B3B3]">
                <span>Total Trials:</span>
                <span>{score.totalTrials}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
