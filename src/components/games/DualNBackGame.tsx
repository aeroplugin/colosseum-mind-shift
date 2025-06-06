
import React, { useState, useEffect, useRef } from "react";
import { DualNBackScore, DualNBackSettings, AudioSettings } from "@/types";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { audioService } from "@/services/audioService";
import { useAppContext } from "@/context/AppContext";
import { Check, X, Play, Pause, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DualNBackGameProps {
  onComplete: (score: DualNBackScore) => void;
  settings?: Partial<DualNBackSettings>;
}

// Array of letters used for audio cues
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

// Generate a random position for the grid (0-8)
const getRandomPosition = (): number => Math.floor(Math.random() * 9);

// Generate a random letter index
const getRandomLetterIndex = (): number => Math.floor(Math.random() * LETTERS.length);

export default function DualNBackGame({ onComplete, settings = {} }: DualNBackGameProps) {
  // Game settings with defaults
  const gameSettings: DualNBackSettings = {
    nLevel: settings.nLevel || 1,
    useVoice: settings.useVoice !== undefined ? settings.useVoice : true,
    duration: settings.duration || 60, // 60 seconds by default
  };

  // Game state
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(gameSettings.duration);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(-1);
  const [currentLetter, setCurrentLetter] = useState<string>('');
  const [roundsCompleted, setRoundsCompleted] = useState<number>(0);
  const [askingQuestion, setAskingQuestion] = useState<boolean>(false);
  const [showVisualFeedback, setShowVisualFeedback] = useState<boolean>(false);
  const [visualFeedbackCorrect, setVisualFeedbackCorrect] = useState<boolean>(false);
  const [showAudioFeedback, setShowAudioFeedback] = useState<boolean>(false);
  const [audioFeedbackCorrect, setAudioFeedbackCorrect] = useState<boolean>(false);
  
  // History for n-back comparison
  const positionHistory = useRef<number[]>([]);
  const letterHistory = useRef<string[]>([]);
  
  // Score tracking
  const [score, setScore] = useState<DualNBackScore>({
    visualCorrect: 0,
    visualIncorrect: 0,
    audioCorrect: 0,
    audioIncorrect: 0,
    totalTrials: 0,
    visualAccuracy: 0,
    audioAccuracy: 0,
    overallAccuracy: 0
  });

  // Get audio settings from context
  const { apiKeyState, audioSettings } = useAppContext();

  // Timer for rounds
  const roundTimer = useRef<NodeJS.Timeout | null>(null);
  const questionTimer = useRef<NodeJS.Timeout | null>(null);

  // Start the game
  const startGame = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeRemaining(gameSettings.duration);
    setCurrentRound(0);
    setRoundsCompleted(0);
    setAskingQuestion(false);
    resetScore();
    positionHistory.current = [];
    letterHistory.current = [];
    startNewRound();
  };

  // Reset the score
  const resetScore = () => {
    setScore({
      visualCorrect: 0,
      visualIncorrect: 0,
      audioCorrect: 0,
      audioIncorrect: 0,
      totalTrials: 0,
      visualAccuracy: 0,
      audioAccuracy: 0,
      overallAccuracy: 0
    });
  };

  // Handle match answer
  const handleMatchAnswer = (type: 'visual' | 'audio', isMatch: boolean) => {
    if (!isActive || isPaused || !askingQuestion) return;
    
    const nBackIndex = currentRound - gameSettings.nLevel - 1;
    
    if (nBackIndex >= 0) {
      let isCorrect = false;
      
      if (type === 'visual') {
        const wasVisualMatch = positionHistory.current[nBackIndex] === positionHistory.current[currentRound - 1];
        isCorrect = (wasVisualMatch && isMatch) || (!wasVisualMatch && !isMatch);
        
        if (isCorrect) {
          setScore(prev => ({
            ...prev,
            visualCorrect: prev.visualCorrect + 1
          }));
          setVisualFeedbackCorrect(true);
        } else {
          setScore(prev => ({
            ...prev,
            visualIncorrect: prev.visualIncorrect + 1
          }));
          setVisualFeedbackCorrect(false);
        }
        
        setShowVisualFeedback(true);
        setTimeout(() => setShowVisualFeedback(false), 500);
      } else if (type === 'audio') {
        const wasAudioMatch = letterHistory.current[nBackIndex] === letterHistory.current[currentRound - 1];
        isCorrect = (wasAudioMatch && isMatch) || (!wasAudioMatch && !isMatch);
        
        if (isCorrect) {
          setScore(prev => ({
            ...prev,
            audioCorrect: prev.audioCorrect + 1
          }));
          setAudioFeedbackCorrect(true);
        } else {
          setScore(prev => ({
            ...prev,
            audioIncorrect: prev.audioIncorrect + 1
          }));
          setAudioFeedbackCorrect(false);
        }
        
        setShowAudioFeedback(true);
        setTimeout(() => setShowAudioFeedback(false), 500);
      }
      
      // Track total trials
      setScore(prev => ({
        ...prev,
        totalTrials: prev.totalTrials + 1
      }));
    }
  };

  // Toggle pause state
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Start a new round
  const startNewRound = async () => {
    // Clear previous timers if exist
    if (roundTimer.current) {
      clearTimeout(roundTimer.current);
    }
    if (questionTimer.current) {
      clearTimeout(questionTimer.current);
    }

    // Generate new position and letter
    const newPosition = getRandomPosition();
    const newLetter = LETTERS[getRandomLetterIndex()];

    // Update state
    setCurrentPosition(newPosition);
    setCurrentLetter(newLetter);

    // Store in history
    positionHistory.current.push(newPosition);
    letterHistory.current.push(newLetter);

    // Play audio cue if enabled
    if (gameSettings.useVoice && apiKeyState.elevenLabsKeyValidated && audioSettings.selectedVoiceId) {
      try {
        const audioUrl = await audioService.generateVoiceover(
          newLetter, 
          apiKeyState.elevenLabsKey, 
          audioSettings.selectedVoiceId
        );
        const audio = new Audio(audioUrl);
        audio.volume = audioSettings.volume;
        audio.play();
      } catch (error) {
        console.error('Failed to generate letter audio:', error);
        // Fallback to system speech synthesis
        const utterance = new SpeechSynthesisUtterance(newLetter);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      // Use system speech synthesis as fallback
      const utterance = new SpeechSynthesisUtterance(newLetter);
      window.speechSynthesis.speak(utterance);
    }

    // Increment round
    setCurrentRound(prev => prev + 1);
    
    // After 3-4 steps, ask if this matches the one from n back
    if (currentRound >= gameSettings.nLevel + 2) { // After N+2 steps
      // Schedule to show position/play sound for a moment
      roundTimer.current = setTimeout(() => {
        // Hide position and show question
        setAskingQuestion(true);
        
        // Reset the question timer
        if (questionTimer.current) {
          clearTimeout(questionTimer.current);
        }
      }, 1000); // Show for 1 second
    } else {
      // Continue showing positions and playing sounds
      roundTimer.current = setTimeout(() => {
        // Clear position for the "rest" period
        setCurrentPosition(-1);
        
        // Start next round after short rest
        setTimeout(() => {
          if (isActive && !isPaused) {
            startNewRound();
          }
        }, 1000);
      }, 1000); // Show for 1 second
    }
  };

  // Handle proceeding to next round after answering questions
  const proceedToNextRound = () => {
    setAskingQuestion(false);
    setCurrentPosition(-1); // Clear position during transition
    
    // Increment completed rounds
    setRoundsCompleted(prev => prev + 1);
    
    // Start next round or end game if all rounds are completed
    if (roundsCompleted >= 2) { // Completed 3 rounds (0, 1, 2)
      endGame();
    } else {
      setTimeout(() => {
        if (isActive && !isPaused) {
          startNewRound();
        }
      }, 1000); // Brief pause before starting next round
    }
  };

  // Calculate final score when game ends
  const calculateFinalScore = () => {
    const visualTotal = score.visualCorrect + score.visualIncorrect;
    const audioTotal = score.audioCorrect + score.audioIncorrect;
    
    const visualAccuracy = visualTotal > 0 ? (score.visualCorrect / visualTotal) * 100 : 0;
    const audioAccuracy = audioTotal > 0 ? (score.audioCorrect / audioTotal) * 100 : 0;
    
    const totalResponses = visualTotal + audioTotal;
    const totalCorrect = score.visualCorrect + score.audioCorrect;
    const overallAccuracy = totalResponses > 0 ? (totalCorrect / totalResponses) * 100 : 0;
    
    return {
      ...score,
      visualAccuracy,
      audioAccuracy,
      overallAccuracy
    };
  };

  // End the game
  const endGame = () => {
    setIsActive(false);
    if (roundTimer.current) {
      clearTimeout(roundTimer.current);
    }
    if (questionTimer.current) {
      clearTimeout(questionTimer.current);
    }
    const finalScore = calculateFinalScore();
    setScore(finalScore);
    onComplete(finalScore);
    toast({
      title: "Game Over!",
      description: "You've completed the Dual N-Back challenge.",
    });
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
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (roundTimer.current) {
        clearTimeout(roundTimer.current);
      }
      if (questionTimer.current) {
        clearTimeout(questionTimer.current);
      }
    };
  }, []);

  // Calculate progress percentage
  const progressPercent = ((gameSettings.duration - timeRemaining) / gameSettings.duration) * 100;

  return (
    <div className="flex flex-col items-center bg-[#121212] text-white p-6 min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2 text-[#D8C5A3]">Dual N-Back Challenge</h1>
        <p className="mb-6 text-[#B3B3B3]">Match visual and audio cues from {gameSettings.nLevel} step{gameSettings.nLevel > 1 ? 's' : ''} ago.</p>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-[#2A2A2A] rounded-full mb-6">
          <div 
            className="h-full bg-[#004F2D] rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        {/* Timer */}
        <div className="text-center mb-8">
          <span className="text-4xl font-bold">{timeRemaining}</span>
          <span className="text-[#B3B3B3]"> seconds</span>
        </div>
        
        {!isActive ? (
          <div className="flex flex-col gap-4 items-center mb-8">
            <p className="text-center mb-4">
              A square will light up and you'll hear a letter. After a few rounds, you'll be asked if the current position or letter matches what appeared {gameSettings.nLevel} step{gameSettings.nLevel > 1 ? 's' : ''} ago.
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
            {/* Question Panel - Show when we're asking a question */}
            {askingQuestion ? (
              <div className="mb-8 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Did these match what appeared {gameSettings.nLevel} step{gameSettings.nLevel > 1 ? 's' : ''} ago?
                </h2>
                
                <div className="mb-6 w-full">
                  <h3 className="text-lg font-medium mb-2 text-[#D8C5A3]">Visual Position</h3>
                  <div className="flex justify-between gap-4 w-full">
                    <Button 
                      onClick={() => {
                        handleMatchAnswer('visual', true);
                        
                        // Check if both answers have been given
                        if (showAudioFeedback) {
                          setTimeout(proceedToNextRound, 500);
                        }
                      }}
                      className={`flex-1 py-3 ${showVisualFeedback ? (visualFeedbackCorrect ? 'bg-green-600' : 'bg-red-600') : 'bg-[#1A1A1A] hover:bg-[#004F2D]'}`}
                      disabled={showVisualFeedback}
                    >
                      Yes
                    </Button>
                    <Button 
                      onClick={() => {
                        handleMatchAnswer('visual', false);
                        
                        // Check if both answers have been given
                        if (showAudioFeedback) {
                          setTimeout(proceedToNextRound, 500);
                        }
                      }}
                      className={`flex-1 py-3 ${showVisualFeedback ? (visualFeedbackCorrect ? 'bg-red-600' : 'bg-green-600') : 'bg-[#1A1A1A] hover:bg-[#004F2D]'}`}
                      disabled={showVisualFeedback}
                    >
                      No
                    </Button>
                  </div>
                </div>
                
                <div className="mb-6 w-full">
                  <h3 className="text-lg font-medium mb-2 text-[#D8C5A3]">Audio Letter</h3>
                  <div className="flex justify-between gap-4 w-full">
                    <Button 
                      onClick={() => {
                        handleMatchAnswer('audio', true);
                        
                        // Check if both answers have been given
                        if (showVisualFeedback) {
                          setTimeout(proceedToNextRound, 500);
                        }
                      }}
                      className={`flex-1 py-3 ${showAudioFeedback ? (audioFeedbackCorrect ? 'bg-green-600' : 'bg-red-600') : 'bg-[#1A1A1A] hover:bg-[#004F2D]'}`}
                      disabled={showAudioFeedback}
                    >
                      Yes
                    </Button>
                    <Button 
                      onClick={() => {
                        handleMatchAnswer('audio', false);
                        
                        // Check if both answers have been given
                        if (showVisualFeedback) {
                          setTimeout(proceedToNextRound, 500);
                        }
                      }}
                      className={`flex-1 py-3 ${showAudioFeedback ? (audioFeedbackCorrect ? 'bg-red-600' : 'bg-green-600') : 'bg-[#1A1A1A] hover:bg-[#004F2D]'}`}
                      disabled={showAudioFeedback}
                    >
                      No
                    </Button>
                  </div>
                </div>
                
                {/* Next button - appears after both answers are given */}
                {showVisualFeedback && showAudioFeedback && (
                  <Button 
                    onClick={proceedToNextRound}
                    className="mt-4 bg-[#004F2D] hover:bg-[#006D3E]"
                  >
                    Next Round
                  </Button>
                )}
              </div>
            ) : (
              /* 3x3 Grid */
              <div className="grid grid-cols-3 gap-2 mb-6 w-full aspect-square">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border-2 border-[#2A2A2A] flex items-center justify-center transition-colors ${
                      currentPosition === index ? 'bg-[#004F2D] border-[#004F2D]' : 'bg-[#1A1A1A]'
                    }`}
                  >
                    {currentPosition === index && (
                      <div className="w-4 h-4 rounded-full bg-[#D8C5A3]"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
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
            
            {/* Round indicator */}
            <div className="flex justify-center mb-6">
              <div className="text-[#B3B3B3]">
                Round: {roundsCompleted + 1} / 3
              </div>
            </div>
          </>
        )}
        
        {/* Score display */}
        {!isActive && score.totalTrials > 0 && (
          <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2A2A2A] mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#D8C5A3]">Your Results</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Visual Accuracy:</span>
                <span>{score.visualAccuracy.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Audio Accuracy:</span>
                <span>{score.audioAccuracy.toFixed(1)}%</span>
              </div>
              <div className="h-px bg-[#2A2A2A] my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Working Memory Score:</span>
                <span>{score.overallAccuracy.toFixed(1)}%</span>
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
