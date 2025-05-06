
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Brain, Library } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6 flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-trajan uppercase tracking-wide text-[#D8C5A3]">Colosseum Mind</h1>
        <p className="text-[#B3B3B3] mt-2">Science-backed 1-minute mental routines</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-12">
          <Brain className="w-20 h-20 mx-auto mb-6 text-[#004F2D]" />
          <h2 className="text-2xl font-trajan uppercase tracking-wide mb-4">Elevate Your Mental State</h2>
          <p className="text-[#B3B3B3] max-w-md mx-auto mb-8">
            Quick, science-backed routines to improve focus, calm, and clarity whenever you need it.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <PrimaryButton 
            variant="primary"
            className="w-full"
            onClick={() => navigate("/quiz")}
          >
            Take Quiz & Get Recommendation
          </PrimaryButton>
          
          <PrimaryButton 
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/library")}
          >
            <Library className="mr-2" />
            Browse Routine Library
          </PrimaryButton>
        </div>
      </div>

      <footer className="mt-8 text-center text-[#B3B3B3] text-sm">
        <p>Precision mental tools for high-performance individuals</p>
      </footer>
    </div>
  );
};

export default Home;
