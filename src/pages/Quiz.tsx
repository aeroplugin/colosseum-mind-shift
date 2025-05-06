
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import CustomSlider from "@/components/ui/CustomSlider";
import CustomToggle from "@/components/ui/CustomToggle";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowLeft } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();
  const { quizState, updateQuizState, getRecommendation, recommendedRoutine } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = [
    { 
      title: "Mental State", 
      description: "Assess your current mental state",
      fields: ["mentalClarity", "energyLevel", "stressLevel"] 
    },
    { 
      title: "Preference", 
      description: "What type of routine do you prefer?",
      fields: ["preferQuickRoutine", "needPhysicalRelaxation"] 
    },
    { 
      title: "Specific Needs", 
      description: "What specific needs do you have right now?",
      fields: ["needFocus", "needVisualization", "needPhysicalActivation"] 
    },
    { 
      title: "Additional Factors", 
      description: "Any other factors to consider?",
      fields: ["needEmotionalRegulation", "wantColdExposure", "needDistractionControl"] 
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const completeQuiz = () => {
    getRecommendation();
    setCompleted(true);
  };

  const startRecommendedRoutine = () => {
    navigate("/routine");
  };

  const goToLibrary = () => {
    navigate("/library");
  };

  const renderField = (field: string) => {
    if (["mentalClarity", "energyLevel", "stressLevel", "preferQuickRoutine", "needPhysicalRelaxation"].includes(field)) {
      // These are slider fields
      const value = quizState[field as keyof typeof quizState] as number;
      let label = "";
      
      switch (field) {
        case "mentalClarity":
          label = "Mental Clarity";
          break;
        case "energyLevel":
          label = "Energy Level";
          break;
        case "stressLevel":
          label = "Stress Level";
          break;
        case "preferQuickRoutine":
          label = "Prefer Quick vs. Deep";
          break;
        case "needPhysicalRelaxation":
          label = "Need Physical Relaxation";
          break;
      }
      
      return (
        <div key={field} className="mb-8">
          <CustomSlider
            label={label}
            value={[value]}
            onValueChange={(values) => updateQuizState({ [field]: values[0] })}
          />
        </div>
      );
    } else {
      // These are toggle fields
      const value = quizState[field as keyof typeof quizState] as boolean;
      let label = "";
      
      switch (field) {
        case "needFocus":
          label = "Need to improve focus";
          break;
        case "needVisualization":
          label = "Want visualization exercise";
          break;
        case "needPhysicalActivation":
          label = "Need physical activation";
          break;
        case "needEmotionalRegulation":
          label = "Need emotional regulation";
          break;
        case "wantColdExposure":
          label = "Open to cold exposure";
          break;
        case "needDistractionControl":
          label = "Need help with distractions";
          break;
      }
      
      return (
        <div key={field} className="mb-6">
          <CustomToggle
            label={label}
            value={value}
            onChange={(value) => updateQuizState({ [field]: value })}
          />
        </div>
      );
    }
  };

  if (completed && recommendedRoutine) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
        <h1 className="text-2xl font-trajan uppercase tracking-wide text-center mb-6">Your Recommendation</h1>
        
        <div className="max-w-md mx-auto bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-trajan uppercase tracking-wide text-[#D8C5A3] mb-4">
            {recommendedRoutine.name}
          </h2>
          
          <p className="text-[#B3B3B3] mb-6">{recommendedRoutine.purpose}</p>
          
          <h3 className="text-[#D8C5A3] uppercase text-sm mb-2">What to do:</h3>
          <ul className="space-y-2 mb-6">
            {recommendedRoutine.steps.map((step, index) => (
              <li key={index} className="flex">
                <span className="text-[#D8C5A3] mr-2">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-xs text-[#B3B3B3] italic mb-6">{recommendedRoutine.science}</p>
          
          <div className="space-y-4">
            <PrimaryButton 
              variant="primary" 
              className="w-full" 
              onClick={startRecommendedRoutine}
            >
              Start this Routine
            </PrimaryButton>
            
            <PrimaryButton 
              variant="secondary" 
              className="w-full" 
              onClick={goToLibrary}
            >
              Choose Different Routine
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handlePrevious}
          className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="ml-4">
          <h1 className="text-2xl font-trajan uppercase tracking-wide">Quiz</h1>
          <p className="text-[#B3B3B3] text-sm">Find your ideal routine</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-[#2A2A2A] mb-8 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#004F2D] transition-all duration-300 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      <h2 className="text-xl font-trajan uppercase text-[#D8C5A3] mb-2">
        {currentStepData.title}
      </h2>
      <p className="text-[#B3B3B3] mb-8">{currentStepData.description}</p>

      <div className="space-y-4 mb-12">
        {currentStepData.fields.map(renderField)}
      </div>

      <PrimaryButton 
        variant="primary" 
        className="w-full" 
        onClick={handleNext}
      >
        {currentStep < steps.length - 1 ? "Continue" : "Get Your Recommendation"}
      </PrimaryButton>
    </div>
  );
};

export default Quiz;
