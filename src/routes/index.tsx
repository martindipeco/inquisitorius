import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { ConfiguracionesPage } from '../pages/ConfiguracionesPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ChatPage } from '../pages/ChatPage';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, ERROR_ROUTES } from './routes';
import { ProtectedRoute } from './ProtectedRoute';
import AboutPage from '../pages/AboutPage';
import HelpPage from '../pages/HelpPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={PUBLIC_ROUTES.HOME} element={<HomePage />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="/acerca" element={<AboutPage />} />
      <Route path="/ayuda" element={<HelpPage />} />
      
      {/* Rutas protegidas */}
      <Route 
        path={PROTECTED_ROUTES.CHAT} 
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PROTECTED_ROUTES.CONFIGURACIONES} 
        element={
          <ProtectedRoute>
            <ConfiguracionesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PROTECTED_ROUTES.CONFIGURACIONES_PERFIL} 
        element={
          <ProtectedRoute>
            <ConfiguracionesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PROTECTED_ROUTES.CONFIGURACIONES_CURSOS} 
        element={
          <ProtectedRoute>
            <ConfiguracionesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PROTECTED_ROUTES.CONFIGURACIONES_CERTIFICACIONES} 
        element={
          <ProtectedRoute>
            <ConfiguracionesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PROTECTED_ROUTES.CONFIGURACIONES_SEGURIDAD} 
        element={
          <ProtectedRoute>
            <ConfiguracionesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path={PROTECTED_ROUTES.CONFIGURACIONES_NOTIFICACIONES} 
        element={
          <ProtectedRoute>
            <ConfiguracionesPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta 404 */}
      <Route path={ERROR_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}; 