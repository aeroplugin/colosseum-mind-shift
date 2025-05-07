
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App.native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Colosseum Mind</Text>
          <Text style={styles.subtitle}>Science-backed 1-minute mental routines</Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.iconButton}
        >
          {/* Settings icon would go here - using text as placeholder */}
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.brainIconPlaceholder}>
          {/* Brain icon placeholder */}
          <Text style={styles.brainIconText}>🧠</Text>
        </View>
        <Text style={styles.heading}>Elevate Your Mental State</Text>
        <Text style={styles.paragraph}>
          Quick, science-backed routines to improve focus, calm, and clarity whenever you need it.
        </Text>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.buttonText}>Take Quiz & Get Recommendation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Library')}
        >
          <Text style={styles.secondaryButtonText}>Browse Routine Library</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Precision mental tools for high-performance individuals</Text>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D8C5A3',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#B3B3B3',
    marginTop: 5,
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainIconPlaceholder: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  brainIconText: {
    fontSize: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: '#004F2D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D8C5A3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#D8C5A3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#B3B3B3',
    textAlign: 'center',
  },
});

export default HomeScreen;
