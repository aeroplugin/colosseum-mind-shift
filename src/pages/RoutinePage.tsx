
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import RoutinePlayer from "@/components/RoutinePlayer";
import { toast } from "@/components/ui/use-toast";

const RoutinePage = () => {
  const navigate = useNavigate();
  const { recommendedRoutine } = useAppContext();

  if (!recommendedRoutine) {
    // Redirect back to quiz if no routine is selected
    navigate("/quiz");
    return null;
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
