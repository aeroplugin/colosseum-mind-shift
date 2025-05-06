
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Check, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { apiKeyState, updateApiKey, validateApiKey } = useAppContext();
  const [keyInput, setKeyInput] = useState(apiKeyState.openAiKey);
  const [isValidating, setIsValidating] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveApiKey = async () => {
    updateApiKey(keyInput);
    setIsValidating(true);

    try {
      const isValid = await validateApiKey();
      
      if (isValid) {
        toast({
          title: "API Key Saved",
          description: "Your OpenAI API key has been validated and saved.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your API key and try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] p-6">
      <div className="flex items-center mb-8">
        <button 
          onClick={handleBackClick}
          className="text-[#D8C5A3] hover:text-[#F5F5F5] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-trajan uppercase tracking-wide ml-4">Settings</h1>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Key className="w-5 h-5 text-[#D8C5A3] mr-2" />
            <h2 className="text-lg font-trajan uppercase text-[#D8C5A3]">OpenAI API Key</h2>
          </div>
          
          <p className="text-sm text-[#B3B3B3] mb-4">
            To use AI-powered features, you need to add your OpenAI API key.
            Your key is stored locally on your device and never sent to our servers.
          </p>
          
          <div className="mb-4">
            <Input
              type="password"
              placeholder="sk-..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#D8C5A3]"
            />
          </div>
          
          <PrimaryButton
            variant="primary"
            className="w-full"
            onClick={handleSaveApiKey}
            disabled={isValidating || !keyInput}
          >
            {isValidating ? "Validating..." : apiKeyState.keyValidated ? "Update API Key" : "Save API Key"}
          </PrimaryButton>
          
          {apiKeyState.keyValidated && (
            <div className="flex items-center mt-4 text-sm text-[#D8C5A3]">
              <Check className="w-4 h-4 mr-2" />
              <span>API Key validated and active</span>
            </div>
          )}
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h2 className="text-lg font-trajan uppercase text-[#D8C5A3] mb-4">About</h2>
          <p className="text-sm text-[#B3B3B3] mb-2">
            ColosseuMind v1.0
          </p>
          <p className="text-sm text-[#B3B3B3]">
            Science-backed mental routines for high-performance individuals.
            Crafted with precision for athletes, executives, and anyone seeking
            mental edge in high-pressure situations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
