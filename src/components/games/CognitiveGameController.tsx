
import React, { useState } from "react";
import { CognitiveGameType, DualNBackScore, StroopTapScore } from "@/types";
import { Card } from "@/components/ui/card";
import DualNBackGame from "./DualNBackGame";
import StroopTapGame from "./StroopTapGame";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CognitiveGameControllerProps {
  gameType: CognitiveGameType;
  onComplete: () => void;
  onBack: () => void;
  onPlayAgain: () => void;
  showResults: boolean;
}

export default function CognitiveGameController({
  gameType,
  onComplete,
  onBack,
  onPlayAgain,
  showResults
}: CognitiveGameControllerProps) {
  const [dualNBackScore, setDualNBackScore] = useState<DualNBackScore | null>(null);
  const [stroopTapScore, setStroopTapScore] = useState<StroopTapScore | null>(null);

  const handleDualNBackComplete = (score: DualNBackScore) => {
    setDualNBackScore(score);
    onComplete();
  };

  const handleStroopTapComplete = (score: StroopTapScore) => {
    setStroopTapScore(score);
    onComplete();
  };

  // Display results screen if showResults is true
  if (showResults) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#F5F5F5] text-xl ml-4">
            {gameType === 'dualNBack' ? 'Dual N-Back Results' : 'Focus Reset Results'}
          </h1>
        </div>

        <Card className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-[#D8C5A3] mb-4">Great job!</h2>
          
          {gameType === 'dualNBack' && dualNBackScore && (
            <div className="space-y-2 mb-6">
              <p>Visual Accuracy: {Math.round(dualNBackScore.visualAccuracy * 100)}%</p>
              <p>Audio Accuracy: {Math.round(dualNBackScore.audioAccuracy * 100)}%</p>
              <p>Overall Performance: {Math.round(dualNBackScore.overallAccuracy * 100)}%</p>
            </div>
          )}
          
          {gameType === 'stroopTap' && stroopTapScore && (
            <div className="space-y-2 mb-6">
              <p>Accuracy: {Math.round(stroopTapScore.accuracy * 100)}%</p>
              <p>Response Time: {Math.round(stroopTapScore.averageReactionTime)} ms</p>
              <p>Correct Taps: {stroopTapScore.correctTaps} of {stroopTapScore.totalTrials}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onPlayAgain}
              className="bg-[#004F2D] hover:bg-[#006D3E] text-white"
            >
              Play Again
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-[#3A3A3A] text-[#D8C5A3]"
            >
              Return to Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Game screen
  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[#F5F5F5] text-xl ml-4">
          {gameType === 'dualNBack' ? 'Dual N-Back Challenge' : '1-Minute Focus Reset'}
        </h1>
      </div>

      {gameType === 'dualNBack' ? (
        <DualNBackGame onComplete={handleDualNBackComplete} />
      ) : (
        <StroopTapGame onComplete={handleStroopTapComplete} />
      )}
    </div>
  );
}
