// Protect window.fetch from being overridden by libraries (AI Studio Fix)
if (typeof window !== 'undefined' && !('___originalFetch' in window)) {
  const originalFetch = window.fetch;
  Object.defineProperty(window, '___originalFetch', { value: originalFetch, enumerable: false });
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
