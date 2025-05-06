
import { useState, useEffect } from "react";
import { Routine } from "@/types";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowLeft, Pause, Play, SkipForward } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds default
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Calculate total time based on routine duration (simplified for demo)
  const totalTime = 60; // 60 seconds per routine for simplicity

  // Calculate steps timing
  const stepTime = Math.floor(totalTime / routine.steps.length);

  useEffect(() => {
    if (isPaused || isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (currentStep >= routine.steps.length - 1) {
            // Routine completed
            clearInterval(timer);
            setIsCompleted(true);
            toast({
              title: "Routine Completed",
              description: "Great job completing your routine!",
              duration: 3000,
            });
            return 0;
          } else {
            // Move to next step
            setCurrentStep(prev => prev + 1);
            return stepTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, isPaused, isCompleted, routine.steps.length, stepTime]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const skipToNextStep = () => {
    if (currentStep < routine.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(stepTime);
    } else {
      setIsCompleted(true);
    }
  };

  // Calculate progress percentage for the circular timer
  const calculateProgress = () => {
    return ((stepTime - timeRemaining) / stepTime) * 100;
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-[#F5F5F5] p-6">
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

      <div className="flex-1 flex flex-col items-center justify-center">
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
              className="text-3xl font-bold fill-[#F5F5F5]"
              style={{ fontSize: '12px' }}
            >
              {timeRemaining}s
            </text>
          </svg>
        </div>

        {/* Current step */}
        <div className="text-center mb-6">
          <p className="text-[#D8C5A3] uppercase text-sm tracking-wide mb-2">
            Step {currentStep + 1} of {routine.steps.length}
          </p>
          <p className="text-xl mb-4">{routine.steps[currentStep]}</p>
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
        </div>
      </div>

      {isCompleted && (
        <div className="w-full">
          <PrimaryButton variant="primary" className="w-full" onClick={onComplete}>
            Complete & Return to Dashboard
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default RoutinePlayer;
