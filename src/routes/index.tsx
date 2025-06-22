import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PUBLIC_ROUTES, ERROR_ROUTES } from './routes';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={PUBLIC_ROUTES.HOME} element={<HomePage />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
      
      {/* Rutas protegidas (futuras) */}
      {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> */}
      {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
      
      {/* Ruta 404 */}
      <Route path={ERROR_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}; 