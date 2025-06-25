import { PUBLIC_ROUTES } from '../routes/routes';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
        <a 
          href={PUBLIC_ROUTES.WELCOME} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};