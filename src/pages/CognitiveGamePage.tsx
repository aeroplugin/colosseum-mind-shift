
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitiveGameType } from "@/types";
import CognitiveGameController from "@/components/games/CognitiveGameController";
import { toast } from "@/components/ui/use-toast";

const CognitiveGamePage = () => {
  const navigate = useNavigate();
  const [selectedGameType, setSelectedGameType] = useState<CognitiveGameType | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Get the game type from URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const gameTypeParam = searchParams.get('type') as CognitiveGameType;

  // Set the game type from URL if not already set
  if (!selectedGameType && (gameTypeParam === 'dualNBack' || gameTypeParam === 'stroopTap')) {
    setSelectedGameType(gameTypeParam);
  }

  const handleGameSelect = (gameType: CognitiveGameType) => {
    setSelectedGameType(gameType);
    setShowResults(false);
    // Update URL without refreshing the page
    window.history.replaceState(null, '', `?type=${gameType}`);
  };

  const handleGameComplete = () => {
    setShowResults(true);
    toast({
      title: "Great job!",
      description: "You've completed the cognitive exercise.",
      duration: 3000,
    });
  };

  const handlePlayAgain = () => {
    setShowResults(false);
  };

  const handleBack = () => {
    if (selectedGameType && showResults) {
      // Go back to game if showing results
      setShowResults(false);
    } else if (selectedGameType) {
      // Go back to selection if a game is selected
      setSelectedGameType(null);
      window.history.replaceState(null, '', '/cognitive');
    } else {
      // Otherwise go back to library
      navigate('/library');
    }
  };

  if (selectedGameType) {
    return (
      <CognitiveGameController 
        gameType={selectedGameType}
        onComplete={handleGameComplete}
        onBack={handleBack}
        onPlayAgain={handlePlayAgain}
        showResults={showResults}
      />
    );
  }

  // Game selection screen
  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBack}
            className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold ml-4">Cognitive Exercises</h1>
        </div>

        <p className="mb-8 text-[#B3B3B3]">
          These short, science-backed cognitive challenges improve mental performance. Choose one to begin:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dual N-Back Card */}
          <div 
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#004F2D] cursor-pointer transition-all"
            onClick={() => handleGameSelect('dualNBack')}
          >
            <h2 className="text-xl font-semibold text-[#D8C5A3] mb-2">Dual N-Back Challenge</h2>
            <div className="text-sm text-[#B3B3B3] mb-4">60 seconds</div>
            <p className="mb-4">
              Enhances working memory by requiring you to remember visual and audio patterns simultaneously.
            </p>
            <div className="text-sm bg-[#004F2D]/20 text-[#D8C5A3] px-3 py-1 rounded-full inline-block">
              Working Memory
            </div>
          </div>

          {/* Stroop Tap Card */}
          <div 
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#004F2D] cursor-pointer transition-all"
            onClick={() => handleGameSelect('stroopTap')}
          >
            <h2 className="text-xl font-semibold text-[#D8C5A3] mb-2">1-Minute Focus Reset</h2>
            <div className="text-sm text-[#B3B3B3] mb-4">60 seconds</div>
            <p className="mb-4">
              Improves selective attention through a simple Stroop test that challenges your brain's processing abilities.
            </p>
            <div className="text-sm bg-[#004F2D]/20 text-[#D8C5A3] px-3 py-1 rounded-full inline-block">
              Executive Function
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveGamePage;
