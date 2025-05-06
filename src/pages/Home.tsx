
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppContext } from "@/context/AppContext";
import { Brain } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { apiKeyState } = useAppContext();
  const [animateIn, setAnimateIn] = useState(true);

  const startQuiz = () => {
    navigate("/quiz");
  };

  const goToLibrary = () => {
    navigate("/library");
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] px-4 py-8 flex flex-col">
      <div className="flex items-center justify-center h-20 mb-8">
        <Brain className="h-10 w-10 text-[#004F2D] mr-3" />
        <h1 className="text-3xl font-trajan uppercase tracking-wide">Colosseum<span className="text-[#D8C5A3]">Mind</span></h1>
      </div>

      <div className={`flex-1 flex flex-col items-center justify-center transition-opacity duration-700 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-4xl font-trajan uppercase tracking-wide text-[#F5F5F5] mb-4">
            Master Your Mind
          </h2>
          
          <p className="text-[#B3B3B3] mb-8">
            Science-backed 1-minute routines to sharpen your mental state for peak performance.
          </p>

          <div className="space-y-4 mb-8">
            <PrimaryButton 
              variant="primary" 
              size="lg" 
              className="w-full" 
              onClick={startQuiz}
            >
              Start Your Routine
            </PrimaryButton>
            
            <PrimaryButton 
              variant="secondary" 
              className="w-full" 
              onClick={goToLibrary}
            >
              Explore Library
            </PrimaryButton>
          </div>

          {!apiKeyState.keyValidated && (
            <div className="bg-[#2A2A2A] rounded-md p-4 mt-8">
              <p className="text-[#D8C5A3] mb-2">Complete your setup</p>
              <p className="text-sm text-[#B3B3B3] mb-4">
                Add your OpenAI API key in settings to unlock AI-powered features.
              </p>
              <PrimaryButton 
                variant="outline" 
                size="sm" 
                onClick={goToSettings}
              >
                Go to Settings
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
