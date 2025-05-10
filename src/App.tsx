
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import SplashScreen from "@/components/SplashScreen";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import RoutinePage from "./pages/RoutinePage";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CognitiveGamePage from "./pages/CognitiveGamePage";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("bwt-visited");
    if (hasVisited) {
      setShowSplash(false);
    } else {
      localStorage.setItem("bwt-visited", "true");
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <BrowserRouter>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/routine" element={<RoutinePage />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/cognitive" element={<CognitiveGamePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
