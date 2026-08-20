import { lazy, Suspense } from 'react';
import AppPreloader from './components/AppPreloader.jsx';

const App = lazy(() => import('./App.jsx'));

export default function RootApp() {
  return (
    <Suspense fallback={<AppPreloader />}>
      <App />
    </Suspense>
  );
}
