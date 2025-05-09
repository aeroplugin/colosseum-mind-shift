
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ArrowLeft, Play, Brain, TimerIcon } from "lucide-react";
import { routines } from "@/data/routines";
import RoutineCard from "@/components/RoutineCard";

const Library = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const handleStartRoutine = (routineId: string) => {
    navigate(`/routine?id=${routineId}`);
  };

  // Filter routines based on selected filter
  const filteredRoutines = filter === "all" 
    ? routines 
    : routines.filter(routine => routine.tags.includes(filter));

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold ml-4">Routine Library</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-full ${filter === "all" 
              ? "bg-[#004F2D] text-white" 
              : "bg-[#1A1A1A] text-[#B3B3B3] hover:bg-[#2A2A2A]"}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("focus")}
            className={`px-4 py-1 rounded-full ${filter === "focus" 
              ? "bg-[#004F2D] text-white" 
              : "bg-[#1A1A1A] text-[#B3B3B3] hover:bg-[#2A2A2A]"}`}
          >
            Focus
          </button>
          <button 
            onClick={() => setFilter("clarity")}
            className={`px-4 py-1 rounded-full ${filter === "clarity" 
              ? "bg-[#004F2D] text-white" 
              : "bg-[#1A1A1A] text-[#B3B3B3] hover:bg-[#2A2A2A]"}`}
          >
            Clarity
          </button>
          <button 
            onClick={() => setFilter("calm")}
            className={`px-4 py-1 rounded-full ${filter === "calm" 
              ? "bg-[#004F2D] text-white" 
              : "bg-[#1A1A1A] text-[#B3B3B3] hover:bg-[#2A2A2A]"}`}
          >
            Calm
          </button>
          <button 
            onClick={() => setFilter("energy")}
            className={`px-4 py-1 rounded-full ${filter === "energy" 
              ? "bg-[#004F2D] text-white" 
              : "bg-[#1A1A1A] text-[#B3B3B3] hover:bg-[#2A2A2A]"}`}
          >
            Energy
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cognitive Exercises</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#004F2D] cursor-pointer transition-all" onClick={() => navigate('/cognitive?type=dualNBack')}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-[#D8C5A3]">
                  <Brain className="mr-2 w-5 h-5" /> Dual N-Back Challenge
                </CardTitle>
                <CardDescription>60 seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Enhance working memory and fluid intelligence with a quick memory challenge.</p>
              </CardContent>
              <CardFooter>
                <div className="text-xs bg-[#004F2D]/20 text-[#D8C5A3] px-2 py-1 rounded-full">
                  Working Memory
                </div>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#004F2D] cursor-pointer transition-all" onClick={() => navigate('/cognitive?type=stroopTap')}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-[#D8C5A3]">
                  <TimerIcon className="mr-2 w-5 h-5" /> 1-Minute Focus Reset
                </CardTitle>
                <CardDescription>60 seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Improve selective attention and executive function with a quick Stroop test.</p>
              </CardContent>
              <CardFooter>
                <div className="text-xs bg-[#004F2D]/20 text-[#D8C5A3] px-2 py-1 rounded-full">
                  Executive Function
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Mindfulness Routines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRoutines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onStart={handleStartRoutine}
              compact={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
