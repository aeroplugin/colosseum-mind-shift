
import React, { useState } from "react";
import { CognitiveGameType, DualNBackScore, StroopTapScore } from "@/types";
import { Card } from "@/components/ui/card";
import DualNBackGame from "./DualNBackGame";
import StroopTapGame from "./StroopTapGame";
import { ArrowLeft } from "lucide-react";

interface CognitiveGameControllerProps {
  gameType: CognitiveGameType;
  onComplete: () => void;
  onBack: () => void;
}

export default function CognitiveGameController({
  gameType,
  onComplete,
  onBack
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
