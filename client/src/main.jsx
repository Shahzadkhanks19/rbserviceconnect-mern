import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import GlobalErrorBoundary from './components/GlobalErrorBoundary.jsx';
import RootApp from './RootApp.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <BrowserRouter>
        <RootApp />
      </BrowserRouter>
    </GlobalErrorBoundary>
  </StrictMode>,
);
