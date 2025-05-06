
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routines } from "@/data/routines";
import RoutineCard from "@/components/RoutineCard";
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Library = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { resetQuiz, setRecommendedRoutine } = useAppContext();

  // Get unique tags from all routines
  const tags = Array.from(
    new Set(routines.flatMap(routine => routine.tags))
  );

  // Filter routines based on search term and selected tag
  const filteredRoutines = routines.filter(routine => {
    const matchesSearch = searchTerm === "" || 
      routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      routine.purpose.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTag = selectedTag === null || routine.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const handleRoutineStart = (routineId: string) => {
    const routine = routines.find(r => r.id === routineId);
    if (routine) {
      // Set the selected routine in the context before navigating
      setRecommendedRoutine(routine);
      navigate("/routine");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleTag = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackClick}
          className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-trajan uppercase tracking-wide ml-4">Routine Library</h1>
      </div>

      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#B3B3B3]" />
          <Input
            type="text"
            placeholder="Search routines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#D8C5A3]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTag === tag
                  ? "bg-[#004F2D] text-[#F5F5F5]"
                  : "bg-[#2A2A2A] text-[#D8C5A3]"
              } transition-colors`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutines.map(routine => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onStart={handleRoutineStart}
          />
        ))}
      </div>

      {filteredRoutines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#B3B3B3]">No routines found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Library;
