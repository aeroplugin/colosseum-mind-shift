
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App.native';

type CognitiveGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CognitiveGame'>;
type CognitiveGameScreenRouteProp = RouteProp<RootStackParamList, 'CognitiveGame'>;

const CognitiveGameScreen = () => {
  const navigation = useNavigation<CognitiveGameScreenNavigationProp>();
  const route = useRoute<CognitiveGameScreenRouteProp>();
  const { gameType } = route.params || { gameType: undefined };

  // Placeholder for the actual game implementation in React Native
  // In a full implementation, we would create separate components for each game type
  // and render them based on the gameType parameter

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {gameType === 'dualNBack' ? 'Dual N-Back Challenge' : '1-Minute Focus Reset'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {!gameType ? (
          <>
            <Text style={styles.heading}>Cognitive Exercises</Text>
            <Text style={styles.paragraph}>
              These short, science-backed cognitive challenges improve mental performance. Choose one to begin:
            </Text>
            
            <TouchableOpacity 
              style={styles.gameCard}
              onPress={() => navigation.navigate('CognitiveGame', { gameType: 'dualNBack' })}
            >
              <Text style={styles.gameTitle}>Dual N-Back Challenge</Text>
              <Text style={styles.gameDuration}>60 seconds</Text>
              <Text style={styles.gameDescription}>
                Enhances working memory by requiring you to remember visual and audio patterns simultaneously.
              </Text>
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>Working Memory</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.gameCard}
              onPress={() => navigation.navigate('CognitiveGame', { gameType: 'stroopTap' })}
            >
              <Text style={styles.gameTitle}>1-Minute Focus Reset</Text>
              <Text style={styles.gameDuration}>60 seconds</Text>
              <Text style={styles.gameDescription}>
                Improves selective attention through a simple Stroop test that challenges your brain's processing abilities.
              </Text>
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>Executive Function</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.gameContainer}>
            <Text style={styles.heading}>Coming Soon</Text>
            <Text style={styles.paragraph}>
              The {gameType === 'dualNBack' ? 'Dual N-Back Challenge' : '1-Minute Focus Reset'} is available on our web app but is still being implemented for mobile.
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Library')}
            >
              <Text style={styles.buttonText}>Return to Library</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  gameCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D8C5A3',
    marginBottom: 4,
  },
  gameDuration: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 8,
  },
  gameDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 24,
  },
  tagContainer: {
    backgroundColor: 'rgba(0, 79, 45, 0.2)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#D8C5A3',
    fontSize: 14,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#004F2D',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CognitiveGameScreen;
