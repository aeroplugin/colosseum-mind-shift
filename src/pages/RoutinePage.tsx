
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import RoutinePlayer from "@/components/RoutinePlayer";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const RoutinePage = () => {
  const navigate = useNavigate();
  const { recommendedRoutine } = useAppContext();

  // Fix React Router warning by moving the navigation to useEffect
  useEffect(() => {
    if (!recommendedRoutine) {
      toast({
        title: "No routine selected",
        description: "Please select a routine first",
        variant: "destructive",
      });
      navigate("/quiz");
    }
  }, [recommendedRoutine, navigate]);

  // If no routine is selected, render a loading state instead of returning null
  if (!recommendedRoutine) {
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
        routine={recommendedRoutine}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    </div>
  );
};

export default RoutinePage;
