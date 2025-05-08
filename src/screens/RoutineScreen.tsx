
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App.native';
import DichotomyCutInput from '../components/DichotomyCutInput';
import DichotomyCutResults from '../components/DichotomyCutResults';
import { DichotomyCutAnalysis } from '../services/openAiService';

type RoutineScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Routine'>;
type RoutineScreenRouteProp = RouteProp<RootStackParamList, 'Routine'>;

const RoutineScreen = () => {
  const navigation = useNavigation<RoutineScreenNavigationProp>();
  const route = useRoute<RoutineScreenRouteProp>();
  const { routineId } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showDichotomyCutInput, setShowDichotomyCutInput] = useState(false);
  const [showDichotomyCutResults, setShowDichotomyCutResults] = useState(false);
  const [analysis, setAnalysis] = useState<DichotomyCutAnalysis | null>(null);
  
  // Sample OpenAI API key - in a real app, this should be securely fetched
  const [apiKey, setApiKey] = useState('');
  
  // Sample routine data - in a real app, this would be fetched based on routineId
  const routine = {
    id: routineId,
    title: routineId === 'dichotomy-cut' ? 'The Dichotomy Cut' : 'Focus Boost',
    duration: 60, // seconds
    instructions: routineId === 'dichotomy-cut' 
      ? 'Split your concerns into "In Your Control" vs "Not In Your Control", then choose to act on 1 you can control'
      : 'Begin by taking a deep breath in through your nose. Hold for 4 seconds. Now exhale slowly through your mouth. Continue this breathing pattern while focusing on a single point.'
  };

  useEffect(() => {
    // If this is the dichotomy-cut routine, show the input form after a brief delay
    if (routineId === 'dichotomy-cut') {
      setTimeout(() => {
        setShowDichotomyCutInput(true);
      }, 500);
    }
  }, [routineId]);

  useEffect(() => {
    let timer;
    if (isPlaying && timeElapsed < routine.duration) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeElapsed, routine.duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetRoutine = () => {
    setIsPlaying(false);
    setTimeElapsed(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = (timeElapsed / routine.duration) * 100;
  
  const handleAnalysisComplete = (analysisResult: DichotomyCutAnalysis) => {
    setAnalysis(analysisResult);
    setShowDichotomyCutInput(false);
    setShowDichotomyCutResults(true);
  };
  
  const handleSkipAnalysis = () => {
    setShowDichotomyCutInput(false);
    setIsPlaying(true);
  };
  
  const handleContinueFromResults = () => {
    setShowDichotomyCutResults(false);
    setIsPlaying(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{routine.title}</Text>
      </View>

      {/* Dichotomy Cut Input Form */}
      <DichotomyCutInput 
        apiKey={apiKey}
        onAnalysisComplete={handleAnalysisComplete}
        onSkip={handleSkipAnalysis}
        isVisible={showDichotomyCutInput}
      />
      
      {/* Dichotomy Cut Results */}
      {analysis && (
        <DichotomyCutResults
          analysis={analysis}
          onContinue={handleContinueFromResults}
          isVisible={showDichotomyCutResults}
        />
      )}
      
      {/* Standard Routine UI - only shown when not in special modes */}
      {!showDichotomyCutInput && !showDichotomyCutResults && (
        <View style={styles.content}>
          <View style={styles.timerContainer}>
            <View style={styles.progressRing}>
              <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` }
              ]} 
            />
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>{routine.instructions}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={resetRoutine}
            >
              <Text style={styles.controlIcon}>↺</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, styles.playButton]}
              onPress={togglePlayPause}
            >
              <Text style={styles.playIcon}>{isPlaying ? '❙❙' : '▶'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlIcon}>⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#D8C5A3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  progressRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#004F2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    marginBottom: 40,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D8C5A3',
    borderRadius: 4,
  },
  instructionsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D8C5A3',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#004F2D',
  },
  controlIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  playIcon: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});

export default RoutineScreen;
