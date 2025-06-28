import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ImageWithFallback } from '../ImageWithFallback';
import { certificationService } from '../../services/certificationService';
import type { Certification } from '../../types/certificationSchema';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useToast } from '../../contexts/ToastContext';

export const CertificationsContent = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { showSuccess, showError } = useToast();

  // Cargar certificaciones desde la API
  useEffect(() => {
    const loadCertifications = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await certificationService.obtenerCertificacionesUsuario(user.id);
        
        if (response.success && response.data) {
          setCertifications(response.data);
        } else {
          setError(response.message || 'No se pudieron cargar las certificaciones');
        }
      } catch (error) {
        console.error('Error cargando certificaciones:', error);
        setError('Error al cargar las certificaciones');
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, [user?.id]);

  const handleDownload = async (certification: Certification) => {
    try {
      const response = await certificationService.descargarCertificacion(parseInt(certification.id));
      
      if (response.success) {
        showSuccess('Descarga iniciada', 'El certificado se está descargando');
        // Aquí podrías implementar la lógica real de descarga
        console.log('Descargando certificado:', certification.nombre);
      } else {
        showError('Error en la descarga', response.message || 'No se pudo descargar el certificado');
      }
    } catch (error) {
      console.error('Error descargando certificado:', error);
      showError('Error en la descarga', 'No se pudo descargar el certificado');
    }
  };

  const handleVerify = async (certification: Certification) => {
    try {
      const response = await certificationService.verificarCertificacion(certification.codigoVerificacion);
      
      if (response.success) {
        showSuccess('Certificado verificado', 'El certificado es válido y auténtico');
      } else {
        showError('Error en la verificación', response.message || 'No se pudo verificar el certificado');
      }
    } catch (error) {
      console.error('Error verificando certificado:', error);
      showError('Error en la verificación', 'No se pudo verificar el certificado');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon icon="mdi:loading" className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
        <Icon icon="mdi:alert-circle" className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar certificaciones</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Certificaciones</h3>
        <p className="text-sm text-gray-500">Visualiza y descarga tus certificados obtenidos.</p>
      </div>

      {certifications.length === 0 ? (
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 text-center">
          <Icon icon="mdi:certificate" className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tienes certificaciones</h3>
          <p className="text-sm text-gray-500 mb-4">Completa cursos para obtener certificados y mostrar tus logros.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Explorar Cursos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {certifications.map((certification) => (
            <div key={certification.id} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <ImageWithFallback
                    src={certification.logoCurso}
                    alt={`Logo de ${certification.nombre}`}
                    size="sm"
                    shape="rounded"
                    skeletonClassName="border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{certification.nombre}</h4>
                    <p className="text-sm text-gray-600">Certificado</p>
                  </div>
                </div>
              </div>

              {/* Información del certificado */}
              <div className="space-y-2 sm:space-y-3 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                  <span className="text-gray-600">Fecha de obtención:</span>
                  <span className="font-medium">{new Date(certification.fechaObtencion).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                  <span className="text-gray-600">Horas completadas:</span>
                  <span className="font-medium">{certification.horasCompletadas} horas</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium truncate">{certification.instructor}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                  <span className="text-gray-600">Código de verificación:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded break-all">
                    {certification.codigoVerificacion}
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleDownload(certification)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Icon icon="mdi:download" className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </button>
                <button
                  onClick={() => handleVerify(certification)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Icon icon="mdi:check-circle" className="w-4 h-4" />
                  <span>Verificar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 