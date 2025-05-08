
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';

// Import screens
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import LibraryScreen from './screens/LibraryScreen';
import RoutineScreen from './screens/RoutineScreen';
import SettingsScreen from './screens/SettingsScreen';
import CognitiveGameScreen from './screens/CognitiveGameScreen';

// Define types for the navigation stack
export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Library: undefined;
  Routine: { routineId: string };
  Settings: undefined;
  CognitiveGame: { gameType: 'dualNBack' | 'stroopTap' };
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator 
              id={undefined}
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#121212' }
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Quiz" component={QuizScreen} />
              <Stack.Screen name="Library" component={LibraryScreen} />
              <Stack.Screen name="Routine" component={RoutineScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="CognitiveGame" component={CognitiveGameScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
