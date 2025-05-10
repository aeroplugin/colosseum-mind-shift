
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This file only runs in web context
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<App />);
}
