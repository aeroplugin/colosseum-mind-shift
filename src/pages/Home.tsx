
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Brain, Library, Settings, Sparkles, ChevronRight } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import ParticleBackground from "@/components/ParticleBackground";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate preloading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.1,
        type: "spring",
        stiffness: 50
      }
    })
  };

  const renderRoutineCard = (
    title: string,
    description: string,
    icon: JSX.Element,
    color: string,
    index: number,
    onClick: () => void
  ) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="luxury-card hover-lift shimmer-border"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <ChevronRight className="text-brushed-gold/50" />
        </div>
        <h3 className="text-xl text-brushed-gold mb-2">{title}</h3>
        <p className="text-beige-cream/70 text-sm">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-deep-black text-beige-cream overflow-hidden">
      <ParticleBackground />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ambient-bg opacity-20"></div>
      
      <div className="relative z-10">
        <div className="container px-6 py-8 mx-auto">
          <motion.header 
            variants={containerVariants}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            className="flex justify-between items-center mb-12"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-playfair text-brushed-gold">bwt</h1>
              <AnimatedText 
                text="Reset Yourself"
                animation="highlight"
                className="text-sm text-beige-cream/70 uppercase tracking-widest mt-1"
              />
            </motion.div>
            
            <motion.button
              variants={itemVariants}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-charcoal text-brushed-gold hover:glow-focus transition-all"
              onClick={() => navigate("/settings")}
              aria-label="Settings"
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </motion.header>

          <motion.div 
            className="flex-1 flex flex-col items-center text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative">
                <Brain className="w-20 h-20 mx-auto mb-6 text-brushed-gold opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-emerald/10 animate-pulse-glow"></div>
                </div>
              </div>
              
              <h2 className="text-3xl font-playfair tracking-wide mb-4 text-beige-cream">
                Elevate Your <span className="text-brushed-gold motion-text">Mental State</span>
              </h2>
              
              <p className="text-beige-cream/70 max-w-md mx-auto mb-8">
                Quick, science-backed routines to improve 
                <span className="text-brushed-gold mx-1 motion-text">focus</span>, 
                <span className="text-brushed-gold mx-1 motion-text">calm</span>, and 
                <span className="text-brushed-gold mx-1 motion-text">clarity</span> whenever you need it.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
              {renderRoutineCard(
                "Personalized Routines",
                "Take a quiz and get a tailored mental routine based on your current state",
                <Sparkles className="w-6 h-6 text-brushed-gold" />,
                "bg-emerald/20",
                0,
                () => navigate("/quiz")
              )}
              
              {renderRoutineCard(
                "Routine Library",
                "Browse our collection of science-backed mental routines",
                <Library className="w-6 h-6 text-brushed-gold" />,
                "bg-brushed-gold/20",
                1,
                () => navigate("/library")
              )}
            </div>
          </motion.div>

          <motion.footer 
            className="mt-8 text-center text-beige-cream/50 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <AnimatedText
              text="Precision mental tools for high-performance individuals"
              animation="fade"
              delay={1300}
            />
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
