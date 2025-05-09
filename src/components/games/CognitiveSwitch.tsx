
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Calculator, 
  Droplet, 
  Triangle, 
  ArrowLeft, 
  ArrowRight,
  Speaker,
  Volume2,
  VolumeX,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { audioService } from "@/services/audioService";
import { useAppContext } from "@/context/AppContext";

type TaskType = 'mathTap' | 'colorWordTap' | 'shapeCount' | 'oddEvenSwitch';

interface TaskScore {
  correct: number;
  incorrect: number;
  total: number;
  averageReactionTime: number;
}

interface CognitiveSwitchScore {
  mathTap: TaskScore;
  colorWordTap: TaskScore;
  shapeCount: TaskScore;
  oddEvenSwitch: TaskScore;
  totalCorrect: number;
  totalQuestions: number;
  overallAccuracy: number;
  averageReactionTime: number;
}

const initialTaskScore = {
  correct: 0,
  incorrect: 0,
  total: 0,
  averageReactionTime: 0,
};

const initialScore: CognitiveSwitchScore = {
  mathTap: { ...initialTaskScore },
  colorWordTap: { ...initialTaskScore },
  shapeCount: { ...initialTaskScore },
  oddEvenSwitch: { ...initialTaskScore },
  totalCorrect: 0,
  totalQuestions: 0,
  overallAccuracy: 0,
  averageReactionTime: 0,
};

interface CognitiveSwitchProps {
  onComplete: (score: CognitiveSwitchScore) => void;
}

const CognitiveSwitch: React.FC<CognitiveSwitchProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskType>('mathTap');
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds total
  const [taskTimeRemaining, setTaskTimeRemaining] = useState(15); // 15 seconds per task
  const [score, setScore] = useState<CognitiveSwitchScore>(initialScore);
  const [isMuted, setIsMuted] = useState(false);
  
  // Task-specific states
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, options: [0, 0, 0, 0] });
  const [colorWord, setColorWord] = useState({ word: '', color: '', options: [''] });
  const [shapes, setShapes] = useState({ triangleCount: 0, totalShapes: 0, options: [0, 0, 0, 0] });
  const [number, setNumber] = useState(0);
  const [lastAnswerTime, setLastAnswerTime] = useState(Date.now());
  
  const { apiKeyState, audioSettings } = useAppContext();

  // Function to generate a new math problem
  const generateMathProblem = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswer = num1 + num2;
    
    // Generate 3 wrong options
    let options = [correctAnswer];
    while (options.length < 4) {
      const wrongAnswer = Math.floor(Math.random() * 20);
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    setMathProblem({ num1, num2, options });
    setLastAnswerTime(Date.now());
  }, []);

  // Function to generate a new color word
  const generateColorWord = useCallback(() => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const colorNames = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
    
    // Select a random word and a different color
    const wordIndex = Math.floor(Math.random() * colors.length);
    let colorIndex;
    do {
      colorIndex = Math.floor(Math.random() * colors.length);
    } while (colorIndex === wordIndex);
    
    const word = colorNames[wordIndex];
    const color = colors[colorIndex];
    
    // Generate options (all colors)
    setColorWord({ word, color, options: colors });
    setLastAnswerTime(Date.now());
  }, []);

  // Function to generate shape counting exercise
  const generateShapes = useCallback(() => {
    const triangleCount = Math.floor(Math.random() * 5) + 1; // 1-5 triangles
    const totalShapes = triangleCount + Math.floor(Math.random() * 5) + 1; // Add some non-triangles
    
    // Generate options
    const correctAnswer = triangleCount;
    let options = [correctAnswer];
    while (options.length < 4) {
      const wrongAnswer = Math.floor(Math.random() * 7) + 1;
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    setShapes({ triangleCount, totalShapes, options });
    setLastAnswerTime(Date.now());
  }, []);

  // Function to generate odd/even number
  const generateNumber = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 100);
    setNumber(newNumber);
    setLastAnswerTime(Date.now());
  }, []);

  // Function to handle task switching
  const switchTask = useCallback(() => {
    const tasks: TaskType[] = ['mathTap', 'colorWordTap', 'shapeCount', 'oddEvenSwitch'];
    const currentIndex = tasks.indexOf(currentTask);
    const nextIndex = (currentIndex + 1) % tasks.length;
    const nextTask = tasks[nextIndex];
    
    setCurrentTask(nextTask);
    setTaskTimeRemaining(15); // Reset task timer
    
    // Generate problem for the new task
    switch (nextTask) {
      case 'mathTap':
        generateMathProblem();
        break;
      case 'colorWordTap':
        generateColorWord();
        break;
      case 'shapeCount':
        generateShapes();
        break;
      case 'oddEvenSwitch':
        generateNumber();
        break;
    }
    
    // Play sound for task switch
    playTaskSwitchSound(nextTask);
    
  }, [currentTask, generateMathProblem, generateColorWord, generateShapes, generateNumber]);

  // Play task switch sound/voiceover
  const playTaskSwitchSound = (task: TaskType) => {
    if (isMuted) return;
    
    // If we have ElevenLabs API key and a selected voice, generate task switch voiceover
    if (apiKeyState.elevenLabsKeyValidated && audioSettings.voiceoverEnabled && audioSettings.selectedVoiceId) {
      let taskName = "";
      switch (task) {
        case 'mathTap': 
          taskName = "Math Tap"; 
          break;
        case 'colorWordTap': 
          taskName = "Color Word Tap"; 
          break;
        case 'shapeCount': 
          taskName = "Shape Count"; 
          break;
        case 'oddEvenSwitch': 
          taskName = "Odd Even Switch"; 
          break;
      }
      
      generateAndPlayVoiceover(`Switching task: ${taskName}`);
    } else {
      // Play a simple chime instead
      const audio = new Audio("https://cdn.pixabay.com/download/audio/2021/08/09/audio_0625c1539c.mp3?filename=simple-notification-152054.mp3");
      audio.volume = 0.3;
      audio.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  // Generate and play voiceover
  const generateAndPlayVoiceover = async (text: string) => {
    try {
      if (apiKeyState.elevenLabsKeyValidated && audioSettings.selectedVoiceId) {
        const voiceoverUrl = await audioService.generateVoiceover(
          text,
          apiKeyState.elevenLabsKey,
          audioSettings.selectedVoiceId
        );
        
        const audio = new Audio(voiceoverUrl);
        audio.volume = audioSettings.volume;
        audio.play().catch(e => console.error("Error playing voiceover:", e));
      }
    } catch (error) {
      console.error("Error generating voiceover:", error);
    }
  };

  // Handle answer for math problem
  const handleMathAnswer = (selectedAnswer: number) => {
    if (!isActive || isPaused) return;
    
    const correctAnswer = mathProblem.num1 + mathProblem.num2;
    const isCorrect = selectedAnswer === correctAnswer;
    const reactionTime = Date.now() - lastAnswerTime;
    
    updateScore('mathTap', isCorrect, reactionTime);
    generateMathProblem();
  };

  // Handle answer for color word
  const handleColorAnswer = (selectedColor: string) => {
    if (!isActive || isPaused) return;
    
    const isCorrect = selectedColor === colorWord.color;
    const reactionTime = Date.now() - lastAnswerTime;
    
    updateScore('colorWordTap', isCorrect, reactionTime);
    generateColorWord();
  };

  // Handle answer for shape count
  const handleShapeAnswer = (selectedCount: number) => {
    if (!isActive || isPaused) return;
    
    const isCorrect = selectedCount === shapes.triangleCount;
    const reactionTime = Date.now() - lastAnswerTime;
    
    updateScore('shapeCount', isCorrect, reactionTime);
    generateShapes();
  };

  // Handle answer for odd/even
  const handleOddEvenAnswer = (isOdd: boolean) => {
    if (!isActive || isPaused) return;
    
    const correctIsOdd = number % 2 !== 0;
    const isCorrect = isOdd === correctIsOdd;
    const reactionTime = Date.now() - lastAnswerTime;
    
    updateScore('oddEvenSwitch', isCorrect, reactionTime);
    generateNumber();
  };

  // Update score for a task
  const updateScore = (task: TaskType, isCorrect: boolean, reactionTime: number) => {
    setScore(prevScore => {
      const taskScore = { ...prevScore[task] };
      taskScore.total += 1;
      if (isCorrect) {
        taskScore.correct += 1;
      } else {
        taskScore.incorrect += 1;
      }
      
      // Update reaction time (running average)
      if (taskScore.averageReactionTime === 0) {
        taskScore.averageReactionTime = reactionTime;
      } else {
        taskScore.averageReactionTime = 
          (taskScore.averageReactionTime * (taskScore.total - 1) + reactionTime) / taskScore.total;
      }
      
      // Calculate overall stats
      const totalCorrect = prevScore.mathTap.correct + prevScore.colorWordTap.correct + 
                          prevScore.shapeCount.correct + prevScore.oddEvenSwitch.correct +
                          (isCorrect ? 1 : 0);
      
      const totalQuestions = prevScore.mathTap.total + prevScore.colorWordTap.total + 
                            prevScore.shapeCount.total + prevScore.oddEvenSwitch.total + 1;
      
      const overallAccuracy = totalCorrect / totalQuestions;
      
      // Calculate overall average reaction time
      const taskTotals = [
        prevScore.mathTap.total, 
        prevScore.colorWordTap.total, 
        prevScore.shapeCount.total, 
        prevScore.oddEvenSwitch.total
      ];
      
      const taskReactionTimes = [
        prevScore.mathTap.averageReactionTime * prevScore.mathTap.total,
        prevScore.colorWordTap.averageReactionTime * prevScore.colorWordTap.total,
        prevScore.shapeCount.averageReactionTime * prevScore.shapeCount.total,
        prevScore.oddEvenSwitch.averageReactionTime * prevScore.oddEvenSwitch.total
      ];
      
      const totalReactionTime = taskReactionTimes.reduce((a, b) => a + b, 0) + reactionTime;
      const averageReactionTime = totalReactionTime / (taskTotals.reduce((a, b) => a + b, 0) + 1);
      
      return {
        ...prevScore,
        [task]: taskScore,
        totalCorrect,
        totalQuestions,
        overallAccuracy,
        averageReactionTime
      };
    });
  };

  // Start the game
  const startGame = () => {
    setIsActive(true);
    setIsPaused(false);
    setScore(initialScore);
    setTimeRemaining(60);
    setTaskTimeRemaining(15);
    setCurrentTask('mathTap');
    
    // Generate initial problems
    generateMathProblem();
    
    // Play start sound/voiceover
    if (!isMuted && apiKeyState.elevenLabsKeyValidated && audioSettings.voiceoverEnabled && audioSettings.selectedVoiceId) {
      generateAndPlayVoiceover("One-Minute Cognitive Switch. Let's begin with Math Tap.");
    }
  };

  // Pause/resume the game
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  // Timer effect
  useEffect(() => {
    if (!isActive || isPaused) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          // Game over
          clearInterval(timer);
          setIsActive(false);
          onComplete(score);
          return 0;
        }
        return prevTime - 1;
      });
      
      setTaskTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          // Switch task
          switchTask();
          return 15;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, isPaused, score, onComplete, switchTask]);

  // Render the task content based on current task
  const renderTaskContent = () => {
    switch (currentTask) {
      case 'mathTap':
        return (
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-6 flex items-center space-x-3">
              <span>{mathProblem.num1}</span>
              <span>+</span>
              <span>{mathProblem.num2}</span>
              <span>=</span>
              <span>?</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mathProblem.options.map((option, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="text-2xl p-6 h-auto"
                  onClick={() => handleMathAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 'colorWordTap':
        return (
          <div className="flex flex-col items-center">
            <div 
              className="text-5xl mb-6 font-bold"
              style={{ color: colorWord.color }}
            >
              {colorWord.word}
            </div>
            <p className="mb-4 text-center">Tap the color of the text, not what it says</p>
            <div className="grid grid-cols-3 gap-3">
              {colorWord.options.map((color, index) => (
                <Button 
                  key={index}
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorAnswer(color)}
                />
              ))}
            </div>
          </div>
        );
      
      case 'shapeCount':
        return (
          <div className="flex flex-col items-center">
            <div className="mb-6 p-4 border rounded-lg grid grid-cols-5 gap-2 w-64 h-64">
              {Array.from({ length: shapes.totalShapes }).map((_, index) => {
                const isTriangle = index < shapes.triangleCount;
                return isTriangle ? (
                  <div key={index} className="flex items-center justify-center">
                    <Triangle className="w-8 h-8 text-blue-500" />
                  </div>
                ) : (
                  <div key={index} className="flex items-center justify-center">
                    {Math.random() > 0.5 ? (
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    ) : (
                      <div className="w-8 h-8 bg-green-500"></div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mb-4 text-center">How many triangles do you see?</p>
            <div className="grid grid-cols-2 gap-3">
              {shapes.options.map((option, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="text-2xl p-6 h-auto"
                  onClick={() => handleShapeAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 'oddEvenSwitch':
        return (
          <div className="flex flex-col items-center">
            <div className="text-7xl mb-6 font-bold">
              {number}
            </div>
            <p className="mb-4 text-center">Tap left for odd, right for even</p>
            <div className="flex gap-6">
              <Button 
                variant="outline"
                className="p-6 h-auto"
                onClick={() => handleOddEvenAnswer(true)}
              >
                <ArrowLeft className="w-12 h-12" />
                <span className="sr-only">Odd</span>
              </Button>
              <Button 
                variant="outline"
                className="p-6 h-auto"
                onClick={() => handleOddEvenAnswer(false)}
              >
                <ArrowRight className="w-12 h-12" />
                <span className="sr-only">Even</span>
              </Button>
            </div>
          </div>
        );
      
      default:
        return <div>Loading...</div>;
    }
  };

  // Render task icon
  const renderTaskIcon = () => {
    switch (currentTask) {
      case 'mathTap':
        return <Calculator className="w-6 h-6" />;
      case 'colorWordTap':
        return <Droplet className="w-6 h-6" />;
      case 'shapeCount':
        return <Triangle className="w-6 h-6" />;
      case 'oddEvenSwitch':
        return (
          <div className="flex">
            <ArrowLeft className="w-4 h-4" />
            <ArrowRight className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      {!isActive ? (
        <Card className="w-full p-6 bg-[#1A1A1A] border-[#2A2A2A]">
          <h2 className="text-xl font-semibold text-[#D8C5A3] mb-4 text-center">
            1-Minute Cognitive Switch
          </h2>
          <p className="mb-6 text-center text-[#B3B3B3]">
            This drill will test your cognitive flexibility by rapidly switching between 4 different tasks.
            Each task lasts 15 seconds. Try to answer as many correctly as possible!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#222] p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Calculator className="w-5 h-5 mr-2 text-[#D8C5A3]" />
                <h3 className="font-medium">Math Tap</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">Solve simple addition problems quickly</p>
            </div>
            
            <div className="bg-[#222] p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Droplet className="w-5 h-5 mr-2 text-[#D8C5A3]" />
                <h3 className="font-medium">Color Word Tap</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">Tap the color, not what the word says</p>
            </div>
            
            <div className="bg-[#222] p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Triangle className="w-5 h-5 mr-2 text-[#D8C5A3]" />
                <h3 className="font-medium">Shape Count</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">Count only the triangles, ignore other shapes</p>
            </div>
            
            <div className="bg-[#222] p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="flex mr-2 text-[#D8C5A3]">
                  <ArrowLeft className="w-4 h-4" />
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="font-medium">Odd/Even Switch</h3>
              </div>
              <p className="text-sm text-[#B3B3B3]">Tap left for odd numbers, right for even</p>
            </div>
          </div>
          
          <Button 
            onClick={startGame}
            className="w-full bg-[#004F2D] hover:bg-[#006D3E] text-white"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Exercise
          </Button>
        </Card>
      ) : (
        <div className="w-full">
          {/* Task header and timer */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center bg-[#222] px-3 py-1 rounded-lg">
              {renderTaskIcon()}
              <span className="ml-2 font-medium">
                {currentTask === 'mathTap' && 'Math Tap'}
                {currentTask === 'colorWordTap' && 'Color Word Tap'}
                {currentTask === 'shapeCount' && 'Shape Count'}
                {currentTask === 'oddEvenSwitch' && 'Odd/Even Switch'}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <div className="bg-[#222] px-3 py-1 rounded-lg flex items-center">
                <span className="font-mono">{taskTimeRemaining}s</span>
              </div>
              <div className="bg-[#222] px-3 py-1 rounded-lg flex items-center">
                <span className="font-mono">{timeRemaining}s</span>
              </div>
            </div>
          </div>
          
          <Card className="w-full p-6 bg-[#1A1A1A] border-[#2A2A2A] mb-4">
            {renderTaskContent()}
          </Card>
          
          {/* Control buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={togglePause}
            >
              {isPaused ? 
                <Play className="w-5 h-5" /> : 
                <Pause className="w-5 h-5" />
              }
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={toggleMute}
            >
              {isMuted ? 
                <VolumeX className="w-5 h-5" /> : 
                <Volume2 className="w-5 h-5" />
              }
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CognitiveSwitch;
