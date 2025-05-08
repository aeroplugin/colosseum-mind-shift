
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { analyzeConcerns, DichotomyCutAnalysis } from '../services/openAiService';

interface DichotomyCutInputProps {
  apiKey: string;
  onAnalysisComplete: (analysis: DichotomyCutAnalysis) => void;
  onSkip: () => void;
  isVisible: boolean;
}

const DichotomyCutInput: React.FC<DichotomyCutInputProps> = ({ 
  apiKey, 
  onAnalysisComplete, 
  onSkip,
  isVisible 
}) => {
  const [concerns, setConcerns] = useState<string[]>(["", "", ""]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null]);

  useEffect(() => {
    // Focus first input when component becomes visible
    if (isVisible && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    }
  }, [isVisible]);

  const handleConcernChange = (text: string, index: number) => {
    const newConcerns = [...concerns];
    newConcerns[index] = text;
    setConcerns(newConcerns);
  };

  const handleAnalyze = async () => {
    // Filter out empty concerns
    const validConcerns = concerns.filter(concern => concern.trim() !== '');
    
    if (validConcerns.length === 0) {
      setError("Please enter at least one concern");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysis = await analyzeConcerns(validConcerns, apiKey);
      onAnalysisComplete(analysis);
    } catch (err) {
      setError("Failed to analyze concerns. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>The Dichotomy Cut</Text>
      <Text style={styles.subtitle}>
        List 3 things currently bothering you
      </Text>

      {concerns.map((concern, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{index + 1}.</Text>
          <TextInput
            ref={el => inputRefs.current[index] = el}
            style={styles.input}
            value={concern}
            onChangeText={(text) => handleConcernChange(text, index)}
            placeholder={`Enter concern #${index + 1}`}
            placeholderTextColor="#6B6B6B"
            returnKeyType={index < 2 ? "next" : "done"}
            onSubmitEditing={() => {
              if (index < 2) {
                inputRefs.current[index + 1]?.focus();
              } else {
                handleAnalyze();
              }
            }}
          />
        </View>
      ))}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={onSkip}
          disabled={isAnalyzing}
        >
          <Text style={styles.skipButtonText}>Skip Analysis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.analyzeButton, !concerns.some(c => c.trim().length > 0) && styles.disabledButton]}
          onPress={handleAnalyze}
          disabled={isAnalyzing || !concerns.some(c => c.trim().length > 0)}
        >
          {isAnalyzing ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.analyzeButtonText}>Analyze</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#D8C5A3',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
    width: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  analyzeButton: {
    backgroundColor: '#004F2D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#D8C5A3',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  errorText: {
    color: '#E53E3E',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default DichotomyCutInput;
