
import { useState, useEffect, useRef } from "react";
import { Routine, InstructionStep } from "@/types";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowLeft, Pause, Play, SkipForward, ThumbsUp, ThumbsDown, Check, Volume2, VolumeX } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { audioService } from "@/services/audioService";

interface RoutinePlayerProps {
  routine: Routine;
  onComplete: () => void;
  onBack: () => void;
}

const RoutinePlayer: React.FC<RoutinePlayerProps> = ({
  routine,
  onComplete,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPreparation, setIsPreparation] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [voiceoverUrl, setVoiceoverUrl] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const { apiKeyState, audioSettings } = useAppContext();

  // Get detailed instructions or create default ones from steps
  const detailedInstructions = routine.detailedInstructions || 
    routine.steps.map((step, index) => ({
      text: step,
      durationSeconds: Math.floor(60 / routine.steps.length)
    }));

  // Calculate total time based on instruction durations
  const totalDuration = detailedInstructions.reduce(
    (sum, step) => sum + step.durationSeconds, 0
  );

  useEffect(() => {
    // Generate voiceover if ElevenLabs API key is available and voice is selected
    const generateVoiceover = async () => {
      if (
        apiKeyState.elevenLabsKeyValidated && 
        audioSettings.voiceoverEnabled && 
        audioSettings.selectedVoiceId
      ) {
        try {
          // Create a script from the routine instructions
          const script = `${routine.name}. ${routine.purpose}. Let's begin. ` + 
            detailedInstructions.map((step, i) => `Step ${i + 1}: ${step.text}`).join(". ");
          
          const url = await audioService.generateVoiceover(
            script, 
            apiKeyState.elevenLabsKey, 
            audioSettings.selectedVoiceId
          );
          
          setVoiceoverUrl(url);
        } catch (error) {
          console.error('Failed to generate voiceover:', error);
          toast({
            title: "Voiceover Generation Failed",
            description: "Using text-only instructions instead.",
            variant: "destructive",
          });
        }
      }
    };

    generateVoiceover();
  }, [routine, apiKeyState, audioSettings, detailedInstructions]);

  useEffect(() => {
    // Initialize
    if (isPreparation) {
      // 5 second prep time
      setTimeRemaining(5);
    } else if (!isPaused && !isCompleted && currentStep < detailedInstructions.length) {
      // Set time for the current step
      setTimeRemaining(detailedInstructions[currentStep].durationSeconds);
    }
  }, [currentStep, isPreparation, detailedInstructions]);

  useEffect(() => {
    if (isPaused || isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (isPreparation) {
            // Move from preparation to first step
            setIsPreparation(false);
            return detailedInstructions[0].durationSeconds;
          } else if (currentStep >= detailedInstructions.length - 1) {
            // Routine completed
            clearInterval(timer);
            setIsCompleted(true);
            setShowFeedback(true);
            playCompletionSound();
            toast({
              title: "Routine Completed",
              description: "Great job completing your routine!",
              duration: 3000,
            });
            return 0;
          } else {
            // Move to next step
            setCurrentStep(prev => prev + 1);
            return detailedInstructions[currentStep + 1].durationSeconds;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, isPaused, isCompleted, isPreparation, detailedInstructions]);

  // Start playing audio when the routine begins
  useEffect(() => {
    if (!isPreparation && voiceoverUrl && !isPaused && !isCompleted) {
      audioService.playRoutineAudio(voiceoverUrl);
    }
    
    return () => {
      if (isCompleted || isPreparation) {
        audioService.stop();
      }
    };
  }, [isPreparation, voiceoverUrl, isPaused, isCompleted]);
  
  // Handle pausing and resuming audio
  useEffect(() => {
    if (isPaused) {
      audioService.pause();
    } else if (!isPreparation && !isCompleted) {
      audioService.resume();
    }
  }, [isPaused, isPreparation, isCompleted]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const toggleMute = () => {
    setIsAudioMuted(prev => !prev);
    audioService.updateSettings({
      ...audioSettings,
      voiceoverEnabled: !isAudioMuted,
      ambienceEnabled: !isAudioMuted
    });
  };

  const skipToNextStep = () => {
    if (isPreparation) {
      setIsPreparation(false);
      setTimeRemaining(detailedInstructions[0].durationSeconds);
    } else if (currentStep < detailedInstructions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(detailedInstructions[currentStep + 1].durationSeconds);
    } else {
      setIsCompleted(true);
      setShowFeedback(true);
      playCompletionSound();
    }
  };

  const playCompletionSound = () => {
    audioService.stop();
    // Play a completion sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const handleFeedbackSubmit = () => {
    // In a real app, you would save this feedback to your backend
    toast({
      title: "Feedback Submitted",
      description: `Thank you for rating this routine ${rating}/10!`,
      duration: 3000,
    });
    onComplete();
  };

  const handleSkipFeedback = () => {
    onComplete();
  };

  // Calculate overall progress percentage
  const calculateProgress = () => {
    const currentStepTime = isPreparation ? 5 : detailedInstructions[currentStep].durationSeconds;
    return ((currentStepTime - timeRemaining) / currentStepTime) * 100;
  };

  // Calculate overall progress considering all steps
  const calculateOverallProgress = () => {
    if (isPreparation) return 0;
    
    // Sum up completed steps
    let completedTime = detailedInstructions
      .slice(0, currentStep)
      .reduce((sum, step) => sum + step.durationSeconds, 0);
    
    // Add current step's progress
    const currentStepTime = detailedInstructions[currentStep].durationSeconds;
    const currentStepProgress = currentStepTime - timeRemaining;
    
    return ((completedTime + currentStepProgress) / totalDuration) * 100;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
      {/* Audio element for sound effects */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_7b6a598726.mp3" />
      
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[#F5F5F5] text-2xl font-trajan uppercase tracking-wide ml-4">
          {routine.name}
        </h1>
      </div>

      {showFeedback ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Card className="bg-[#2A2A2A] border-none w-full max-w-md">
            <CardContent className="pt-6">
              <h2 className="text-xl font-trajan text-[#D8C5A3] uppercase mb-6 text-center">
                How did this routine make you feel?
              </h2>
              
              <div className="flex justify-between mb-2 text-sm">
                <span>Not helpful</span>
                <span>Very helpful</span>
              </div>
              
              <div className="mb-6">
                <Slider
                  value={[rating]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setRating(value[0])}
                />
                <div className="flex justify-between mt-1 text-xs text-[#B3B3B3]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <span key={num} className={num === rating ? "text-[#D8C5A3]" : ""}>
                      {num}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <PrimaryButton 
                  variant="primary" 
                  className="flex-1"
                  onClick={handleFeedbackSubmit}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Submit
                </PrimaryButton>
                
                <PrimaryButton 
                  variant="secondary" 
                  className="flex-1"
                  onClick={handleSkipFeedback}
                >
                  Skip
                </PrimaryButton>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => navigate("/library")}
                  className="text-[#D8C5A3] text-sm hover:underline"
                >
                  Try another routine
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Progress bar */}
          <div className="w-full max-w-md h-2 bg-[#2A2A2A] rounded-full mb-8">
            <div 
              className="h-full bg-[#004F2D] rounded-full transition-all duration-300"
              style={{ width: `${calculateOverallProgress()}%` }}
            ></div>
          </div>

          {/* Circular timer */}
          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#2A2A2A"
                strokeWidth="5"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="#004F2D"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - calculateProgress() / 100)}`}
                transform="rotate(-90 50 50)"
              />
              {/* Center text for time */}
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dy=".3em"
                className="fill-[#F5F5F5]"
                style={{ fontSize: '16px' }}
              >
                {timeRemaining}s
              </text>
            </svg>
          </div>

          {/* Audio availability status */}
          {!voiceoverUrl && apiKeyState.elevenLabsKeyValidated && audioSettings.voiceoverEnabled && (
            <div className="mb-4 text-center text-sm text-[#D8C5A3]">
              Generating audio guidance...
            </div>
          )}

          {/* Current step */}
          <div className="text-center mb-8 w-full max-w-md">
            <p className="text-[#D8C5A3] uppercase text-sm tracking-wide mb-2">
              {isPreparation 
                ? "Prepare to begin" 
                : `Step ${currentStep + 1} of ${detailedInstructions.length}`}
            </p>
            <p className="text-xl mb-4">
              {isPreparation 
                ? "Take a deep breath and get ready" 
                : detailedInstructions[currentStep].text}
            </p>
            <p className="text-sm text-[#B3B3B3]">
              {routine.purpose}
            </p>
          </div>

          {/* Control buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={togglePause}
              className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#004F2D] transition-colors"
            >
              {isPaused ? (
                <Play className="w-6 h-6 text-[#F5F5F5]" />
              ) : (
                <Pause className="w-6 h-6 text-[#F5F5F5]" />
              )}
            </button>
            <button
              onClick={skipToNextStep}
              className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#004F2D] transition-colors"
            >
              <SkipForward className="w-6 h-6 text-[#F5F5F5]" />
            </button>
            <button
              onClick={toggleMute}
              className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#004F2D] transition-colors"
            >
              {isAudioMuted ? (
                <VolumeX className="w-6 h-6 text-[#F5F5F5]" />
              ) : (
                <Volume2 className="w-6 h-6 text-[#F5F5F5]" />
              )}
            </button>
          </div>

          {/* Like/Dislike buttons (only shown when the routine is active) */}
          {!isPreparation && !isCompleted && (
            <div className="flex space-x-6">
              <button className="flex flex-col items-center text-[#B3B3B3] hover:text-[#D8C5A3]">
                <ThumbsUp className="w-6 h-6 mb-1" />
                <span className="text-xs">Helpful</span>
              </button>
              <button className="flex flex-col items-center text-[#B3B3B3] hover:text-[#D8C5A3]">
                <ThumbsDown className="w-6 h-6 mb-1" />
                <span className="text-xs">Not for me</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoutinePlayer;
