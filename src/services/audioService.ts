import { AudioSettings } from "@/types";

class AudioService {
  private voiceover: HTMLAudioElement | null = null;
  private ambience: HTMLAudioElement | null = null;
  private settings: AudioSettings;

  constructor(settings: AudioSettings) {
    this.settings = settings;
  }

  updateSettings(settings: AudioSettings) {
    this.settings = settings;
    this.applySettings();
  }

  private applySettings() {
    if (this.voiceover) {
      this.voiceover.volume = this.settings.volume;
      this.voiceover.muted = !this.settings.voiceoverEnabled;
    }

    if (this.ambience) {
      this.ambience.volume = this.settings.volume * 0.3; // Ambient sound at 30% of main volume
      this.ambience.muted = !this.settings.ambienceEnabled;
    }
  }

  async generateVoiceover(text: string, apiKey: string, voiceId: string): Promise<string> {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate voiceover');
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating voiceover:', error);
      throw error;
    }
  }

  getAmbienceUrl(style: string): string {
    switch (style) {
      case 'zen-rain':
        return 'https://example.com/zen-rain.mp3'; // Replace with actual URL
      case 'calm-ocean':
        return 'https://example.com/calm-ocean.mp3'; // Replace with actual URL
      default:
        return '';
    }
  }

  async playRoutineAudio(voiceoverUrl: string) {
    // Stop any existing audio
    this.stop();

    // Create and play voiceover
    if (this.settings.voiceoverEnabled) {
      this.voiceover = new Audio(voiceoverUrl);
      this.voiceover.volume = this.settings.volume;
      await this.voiceover.play();
    }

    // Create and play ambience
    if (this.settings.ambienceEnabled && this.settings.ambienceStyle !== 'none') {
      const ambienceUrl = this.getAmbienceUrl(this.settings.ambienceStyle);
      this.ambience = new Audio(ambienceUrl);
      this.ambience.volume = this.settings.volume * 0.3;
      this.ambience.loop = true;
      await this.ambience.play();
    }
  }

  pause() {
    this.voiceover?.pause();
    this.ambience?.pause();
  }

  async resume()  {
    if (this.voiceover) {
      await this.voiceover.play();
    }
    if (this.ambience) {
      await this.ambience.play();
    }
  }

  stop() {
    if (this.voiceover) {
      this.voiceover.pause();
      this.voiceover.currentTime = 0;
      this.voiceover = null;
    }

    if (this.ambience) {
      this.ambience.pause();
      this.ambience.currentTime = 0;
      this.ambience = null;
    }
  }
}

export const audioService = new AudioService({
  voiceoverEnabled: true,
  ambienceEnabled: true,
  selectedVoiceId: "",
  ambienceStyle: "zen-rain",
  volume: 0.8
});