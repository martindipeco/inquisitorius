import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, ERROR_ROUTES } from './routes';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={PUBLIC_ROUTES.HOME} element={<HomePage />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
      
      {/* Rutas protegidas (futuras) */}
      <Route 
        path={PROTECTED_ROUTES.EDIT_PROFILE} 
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        } 
      />
      {/* <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
      
      {/* Ruta 404 */}
      <Route path={ERROR_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}; 