
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Switch, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { 
    apiKeyState, 
    updateApiKey, 
    validateApiKey, 
    audioSettings, 
    updateAudioSettings,
    availableVoices,
    fetchVoices
  } = useAppContext();

  const [openAiKeyInput, setOpenAiKeyInput] = useState(apiKeyState.openAiKey);
  const [elevenLabsKeyInput, setElevenLabsKeyInput] = useState(apiKeyState.elevenLabsKey);
  const [isValidatingOpenAi, setIsValidatingOpenAi] = useState(false);
  const [isValidatingElevenLabs, setIsValidatingElevenLabs] = useState(false);

  useEffect(() => {
    if (apiKeyState.elevenLabsKeyValidated) {
      fetchVoices();
    }
  }, [apiKeyState.elevenLabsKeyValidated]);

  const handleSaveOpenAiKey = async () => {
    updateApiKey(openAiKeyInput, 'openai');
    setIsValidatingOpenAi(true);

    try {
      const isValid = await validateApiKey('openai');
      setIsValidatingOpenAi(false);
      // Would show a toast notification here in a real app
    } catch (error) {
      setIsValidatingOpenAi(false);
      // Would show an error toast here
    }
  };

  const handleSaveElevenLabsKey = async () => {
    updateApiKey(elevenLabsKeyInput, 'elevenlabs');
    setIsValidatingElevenLabs(true);

    try {
      const isValid = await validateApiKey('elevenlabs');
      setIsValidatingElevenLabs(false);
      // Would show a toast notification here
    } catch (error) {
      setIsValidatingElevenLabs(false);
      // Would show an error toast here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* OpenAI API Key Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>OpenAI API Key</Text>
          </View>
          
          <Text style={styles.description}>
            Required for AI-powered features. Your key is stored locally and never sent to our servers.
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="sk-..."
            placeholderTextColor="#B3B3B3"
            value={openAiKeyInput}
            onChangeText={setOpenAiKeyInput}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSaveOpenAiKey}
            disabled={isValidatingOpenAi || !openAiKeyInput}
          >
            <Text style={styles.buttonText}>
              {isValidatingOpenAi ? "Validating..." : apiKeyState.keyValidated ? "Update API Key" : "Save API Key"}
            </Text>
          </TouchableOpacity>
          
          {apiKeyState.keyValidated && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>✓ OpenAI API Key validated and active</Text>
            </View>
          )}
        </View>

        {/* ElevenLabs API Key Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ElevenLabs API Key</Text>
          </View>
          
          <Text style={styles.description}>
            Required for voice guidance features. Your key is stored locally and never sent to our servers.
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter your ElevenLabs API key"
            placeholderTextColor="#B3B3B3"
            value={elevenLabsKeyInput}
            onChangeText={setElevenLabsKeyInput}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSaveElevenLabsKey}
            disabled={isValidatingElevenLabs || !elevenLabsKeyInput}
          >
            <Text style={styles.buttonText}>
              {isValidatingElevenLabs ? "Validating..." : apiKeyState.elevenLabsKeyValidated ? "Update API Key" : "Save API Key"}
            </Text>
          </TouchableOpacity>
          
          {apiKeyState.elevenLabsKeyValidated && (
            <View style={styles.validationMessage}>
              <Text style={styles.validationText}>✓ ElevenLabs API Key validated and active</Text>
            </View>
          )}
        </View>

        {/* Audio Settings Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Audio Settings</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Voice Guidance</Text>
            <Switch
              value={audioSettings.voiceoverEnabled}
              onValueChange={(value) => updateAudioSettings({ voiceoverEnabled: value })}
              trackColor={{ false: "#3A3A3A", true: "#004F2D" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Ambient Sound</Text>
            <Switch
              value={audioSettings.ambienceEnabled}
              onValueChange={(value) => updateAudioSettings({ ambienceEnabled: value })}
              trackColor={{ false: "#3A3A3A", true: "#004F2D" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Volume control would be a slider here */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Volume: {Math.round(audioSettings.volume * 100)}%</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.description}>ColosseuMind v1.0</Text>
          <Text style={styles.description}>
            Science-backed mental routines for high-performance individuals.
            Crafted with precision for athletes, executives, and anyone seeking
            mental edge in high-pressure situations.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
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
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D8C5A3',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 15,
    color: '#FFFFFF',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  primaryButton: {
    backgroundColor: '#004F2D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validationMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  validationText: {
    color: '#D8C5A3',
    fontSize: 14,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SettingsScreen;
