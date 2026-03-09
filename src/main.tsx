import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeAnalytics, trackPageView } from './utils/analytics'

console.log('Main.tsx is executing');
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

// Initialize Google Analytics
initializeAnalytics();
// Track initial page view
trackPageView('Make Better Pizza', '/');

if (rootElement) {
  try {
    console.log('Attempting to render App');
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering App:', error);
    // Fallback content if App fails to render
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>Error Loading App</h1>
        <p>There was an error loading the app. Please check the console for details.</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
}
