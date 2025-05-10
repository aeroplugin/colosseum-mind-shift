
import { Platform } from 'react-native';

// Dynamically choose between native and web versions
let App;
if (Platform.OS === 'web') {
  App = require('./src/App.tsx').default;
} else {
  App = require('./src/App.native.tsx').default;
}

export default App;
