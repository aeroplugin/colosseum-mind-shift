
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample data - in a real app, this would come from context/API
const routines = [
  { id: '1', title: 'Focus Boost', duration: '1 min', description: 'Quick routine to boost focus and attention.' },
  { id: '2', title: 'Calm Mind', duration: '2 min', description: 'Reduce anxiety and find your center.' },
  { id: '3', title: 'Energy Lift', duration: '3 min', description: 'Combat fatigue and increase energy levels.' },
];

const LibraryScreen = () => {
  const navigation = useNavigation();

  const renderRoutineItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.routineCard}
      onPress={() => navigation.navigate('Routine', { routineId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.routineTitle}>{item.title}</Text>
        <Text style={styles.routineDuration}>{item.duration}</Text>
      </View>
      <Text style={styles.routineDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Routine Library</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Browse All Routines</Text>
        <Text style={styles.paragraph}>
          Select a routine from our library of science-backed mental exercises.
        </Text>
        
        <FlatList
          data={routines}
          renderItem={renderRoutineItem}
          keyExtractor={item => item.id}
          style={styles.routineList}
          contentContainerStyle={styles.routineListContent}
        />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#D8C5A3',
  },
  settingsButton: {
    padding: 10,
  },
  settingsButtonText: {
    fontSize: 24,
    color: '#D8C5A3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    flex: 1,
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
  },
  routineList: {
    flex: 1,
  },
  routineListContent: {
    paddingBottom: 20,
  },
  routineCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D8C5A3',
  },
  routineDuration: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  routineDescription: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default LibraryScreen;
