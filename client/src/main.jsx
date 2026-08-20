import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppPreloader from './components/AppPreloader.jsx';
import GlobalErrorBoundary from './components/GlobalErrorBoundary.jsx';
import './index.css';

const App=lazy(()=>import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<AppPreloader/>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </GlobalErrorBoundary>
  </StrictMode>,
);
