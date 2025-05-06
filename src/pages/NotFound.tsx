
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/ui/PrimaryButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-trajan uppercase tracking-wide text-[#D8C5A3] mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <PrimaryButton 
        variant="primary"
        onClick={() => navigate("/")}
      >
        Return to Home
      </PrimaryButton>
    </div>
  );
};

export default NotFound;
