
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import RoutinePlayer from "@/components/RoutinePlayer";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Routine } from "@/types";
import { routines } from "@/data/routines";

const RoutinePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { recommendedRoutine } = useAppContext();
  const [routineToPlay, setRoutineToPlay] = useState<Routine | null>(null);

  useEffect(() => {
    // Check for routine ID in URL parameters
    const routineId = searchParams.get('id');
    
    if (routineId) {
      // Find routine by ID from routines data
      const foundRoutine = routines.find(r => r.id === routineId);
      if (foundRoutine) {
        setRoutineToPlay(foundRoutine);
      } else {
        toast({
          title: "Routine not found",
          description: `No routine found with ID: ${routineId}`,
          variant: "destructive",
        });
        navigate("/library");
      }
    } else if (recommendedRoutine) {
      // Use recommended routine if no ID in URL
      setRoutineToPlay(recommendedRoutine);
    } else {
      // No routine available
      toast({
        title: "No routine selected",
        description: "Please select a routine first",
        variant: "destructive",
      });
      navigate("/quiz");
    }
  }, [recommendedRoutine, navigate, searchParams]);

  // If no routine is selected, render a loading state
  if (!routineToPlay) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-[#F5F5F5] text-lg">Loading your routine...</div>
      </div>
    );
  }

  const handleComplete = () => {
    toast({
      title: "Routine Completed",
      description: "Great job completing your routine!",
      duration: 3000,
    });
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <RoutinePlayer 
        routine={routineToPlay}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    </div>
  );
};

export default RoutinePage;
