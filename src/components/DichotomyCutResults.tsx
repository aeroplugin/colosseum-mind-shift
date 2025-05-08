
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DichotomyCutAnalysis } from '../services/openAiService';

interface DichotomyCutResultsProps {
  analysis: DichotomyCutAnalysis;
  onContinue: () => void;
  isVisible: boolean;
}

const DichotomyCutResults: React.FC<DichotomyCutResultsProps> = ({ 
  analysis, 
  onContinue,
  isVisible 
}) => {
  if (!isVisible) return null;
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>The Dichotomy Cut</Text>
      <Text style={styles.subtitle}>Analysis Results</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>In Your Control</Text>
        {analysis.controllable.length > 0 ? (
          analysis.controllable.map((item, index) => (
            <View key={`controllable-${index}`} style={styles.itemContainer}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No controllable concerns identified</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Not In Your Control</Text>
        {analysis.uncontrollable.length > 0 ? (
          analysis.uncontrollable.map((item, index) => (
            <View key={`uncontrollable-${index}`} style={styles.itemContainer}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No uncontrollable concerns identified</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Action</Text>
        <Text style={styles.recommendationText}>{analysis.recommendation}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={onContinue}
      >
        <Text style={styles.continueButtonText}>Continue Routine</Text>
      </TouchableOpacity>
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
  section: {
    marginBottom: 24,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D8C5A3',
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#D8C5A3',
    marginRight: 8,
    lineHeight: 24,
  },
  itemText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 24,
  },
  recommendationText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: '#004F2D',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DichotomyCutResults;
