import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ToastProvider } from './components/Toast/ToastProvider';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
