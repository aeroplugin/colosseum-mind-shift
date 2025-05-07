import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, Check, Key, Volume2, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

const Settings = () => {
  const navigate = useNavigate();
  const { 
    apiKeyState, 
    updateApiKey, 
    validateApiKey,
    audioSettings,
    updateAudioSettings,
    availableVoices,
    fetchVoices
  } = useAppContext();

  const [openAiKeyInput, setOpenAiKeyInput] = useState(apiKeyState.openAiKey);
  const [elevenLabsKeyInput, setElevenLabsKeyInput] = useState(apiKeyState.elevenLabsKey);
  const [isValidatingOpenAi, setIsValidatingOpenAi] = useState(false);
  const [isValidatingElevenLabs, setIsValidatingElevenLabs] = useState(false);

  useEffect(() => {
    if (apiKeyState.elevenLabsKeyValidated) {
      fetchVoices();
    }
  }, [apiKeyState.elevenLabsKeyValidated]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveOpenAiKey = async () => {
    updateApiKey(openAiKeyInput, 'openai');
    setIsValidatingOpenAi(true);

    try {
      const isValid = await validateApiKey('openai');
      
      if (isValid) {
        toast({
          title: "OpenAI API Key Saved",
          description: "Your OpenAI API key has been validated and saved.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your OpenAI API key and try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate OpenAI API key. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsValidatingOpenAi(false);
    }
  };

  const handleSaveElevenLabsKey = async () => {
    updateApiKey(elevenLabsKeyInput, 'elevenlabs');
    setIsValidatingElevenLabs(true);

    try {
      const isValid = await validateApiKey('elevenlabs');
      
      if (isValid) {
        toast({
          title: "ElevenLabs API Key Saved",
          description: "Your ElevenLabs API key has been validated and saved.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your ElevenLabs API key and try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate ElevenLabs API key. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsValidatingElevenLabs(false);
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

      <div className="max-w-md mx-auto space-y-6">
        {/* OpenAI API Key Section */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Key className="w-5 h-5 text-[#D8C5A3] mr-2" />
            <h2 className="text-lg font-trajan uppercase text-[#D8C5A3]">OpenAI API Key</h2>
          </div>
          
          <p className="text-sm text-[#B3B3B3] mb-4">
            Required for AI-powered features. Your key is stored locally and never sent to our servers.
          </p>
          
          <div className="mb-4">
            <Input
              type="password"
              placeholder="sk-..."
              value={openAiKeyInput}
              onChange={(e) => setOpenAiKeyInput(e.target.value)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#D8C5A3]"
            />
          </div>
          
          <PrimaryButton
            variant="primary"
            className="w-full"
            onClick={handleSaveOpenAiKey}
            disabled={isValidatingOpenAi || !openAiKeyInput}
          >
            {isValidatingOpenAi ? "Validating..." : apiKeyState.keyValidated ? "Update API Key" : "Save API Key"}
          </PrimaryButton>
          
          {apiKeyState.keyValidated && (
            <div className="flex items-center mt-4 text-sm text-[#D8C5A3]">
              <Check className="w-4 h-4 mr-2" />
              <span>OpenAI API Key validated and active</span>
            </div>
          )}
        </div>

        {/* ElevenLabs API Key Section */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Volume2 className="w-5 h-5 text-[#D8C5A3] mr-2" />
            <h2 className="text-lg font-trajan uppercase text-[#D8C5A3]">ElevenLabs API Key</h2>
          </div>
          
          <p className="text-sm text-[#B3B3B3] mb-4">
            Required for voice guidance features. Your key is stored locally and never sent to our servers.
          </p>
          
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Enter your ElevenLabs API key"
              value={elevenLabsKeyInput}
              onChange={(e) => setElevenLabsKeyInput(e.target.value)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#D8C5A3]"
            />
          </div>
          
          <PrimaryButton
            variant="primary"
            className="w-full"
            onClick={handleSaveElevenLabsKey}
            disabled={isValidatingElevenLabs || !elevenLabsKeyInput}
          >
            {isValidatingElevenLabs ? "Validating..." : apiKeyState.elevenLabsKeyValidated ? "Update API Key" : "Save API Key"}
          </PrimaryButton>
          
          {apiKeyState.elevenLabsKeyValidated && (
            <div className="flex items-center mt-4 text-sm text-[#D8C5A3]">
              <Check className="w-4 h-4 mr-2" />
              <span>ElevenLabs API Key validated and active</span>
            </div>
          )}
        </div>

        {/* Audio Settings Section */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Music className="w-5 h-5 text-[#D8C5A3] mr-2" />
            <h2 className="text-lg font-trajan uppercase text-[#D8C5A3]">Audio Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Voice Guidance Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-[#F5F5F5]">Voice Guidance</Label>
              <Switch
                checked={audioSettings.voiceoverEnabled}
                onCheckedChange={(checked) => updateAudioSettings({ voiceoverEnabled: checked })}
              />
            </div>

            {/* Voice Selection */}
            {audioSettings.voiceoverEnabled && apiKeyState.elevenLabsKeyValidated && (
              <div className="space-y-2">
                <Label className="text-[#F5F5F5]">Select Voice</Label>
                <Select
                  value={audioSettings.selectedVoiceId}
                  onValueChange={(value) => updateAudioSettings({ selectedVoiceId: value })}
                >
                  <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F5F5]">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map((voice) => (
                      <SelectItem key={voice.voice_id} value={voice.voice_id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Ambient Sound Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-[#F5F5F5]">Ambient Sound</Label>
              <Switch
                checked={audioSettings.ambienceEnabled}
                onCheckedChange={(checked) => updateAudioSettings({ ambienceEnabled: checked })}
              />
            </div>

            {/* Ambience Style Selection */}
            {audioSettings.ambienceEnabled && (
              <div className="space-y-2">
                <Label className="text-[#F5F5F5]">Ambience Style</Label>
                <Select
                  value={audioSettings.ambienceStyle}
                  onValueChange={(value: any) => updateAudioSettings({ ambienceStyle: value })}
                >
                  <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-[#F5F5F5]">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zen-rain">Zen Rain</SelectItem>
                    <SelectItem value="calm-ocean">Calm Ocean</SelectItem>
                    <SelectItem value="none">No Ambience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Volume Control */}
            <div className="space-y-2">
              <Label className="text-[#F5F5F5]">Volume</Label>
              <Slider
                value={[audioSettings.volume * 100]}
                onValueChange={(value) => updateAudioSettings({ volume: value[0] / 100 })}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
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