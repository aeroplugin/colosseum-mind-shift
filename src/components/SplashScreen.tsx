
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

const SplashScreen = ({ onComplete, duration = 2500 }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black"
        >
          <ParticleBackground 
            count={20}
            color="rgba(216, 197, 163, 0.2)"
            minSize={3}
            maxSize={8}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.2,
                duration: 1,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              className="relative flex items-center justify-center mb-8"
            >
              <div className={cn(
                "text-5xl font-playfair font-light text-brushed-gold",
                "after:content-[''] after:absolute after:bottom-0 after:left-1/2",
                "after:w-16 after:h-0.5 after:bg-brushed-gold/50",
                "after:transform after:-translate-x-1/2"
              )}>
                bwt
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="text-sm text-beige-cream/70 uppercase tracking-widest mt-2"
            >
              Reset Yourself
            </motion.div>
          </div>
          
          {/* Audio cue */}
          <audio
            src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_30ff3b6a0d.mp3?filename=interface-124464.mp3"
            autoPlay
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
