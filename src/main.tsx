import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Performance optimization: Use requestIdleCallback for non-critical initialization
const initApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Use requestIdleCallback if available, otherwise fallback to immediate execution
if ('requestIdleCallback' in window) {
  requestIdleCallback(initApp)
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initApp, 0)
}
