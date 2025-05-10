
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.colosseummind',
  appName: 'colosseum-mind-shift',
  webDir: 'dist',
  server: {
    url: "https://14220177-bb5c-4002-ab29-2d8c5e55daed.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    scheme: 'ColosseuMind'
  },
  android: {
    flavor: 'production'
  }
};

export default config;
