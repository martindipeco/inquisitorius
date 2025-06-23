import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ImageWithFallback } from '../ImageWithFallback';
import certificationsData from '../../mocks/certifications.json';

interface Certification {
  id: string;
  nombre: string;
  fechaObtencion: string;
  imagen: string;
  logoCurso: string;
  codigoVerificacion: string;
  horasCompletadas: number;
  instructor: string;
}

export const CertificationsContent = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde el archivo JSON
  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setCertifications(certificationsData.certifications as Certification[]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDownload = (certification: Certification) => {
    console.log('Descargando certificado:', certification.nombre);
    // Aquí iría la lógica para descargar el PDF
  };

  const handleVerify = (certification: Certification) => {
    console.log('Verificando certificado:', certification.codigoVerificacion);
    // Aquí iría la lógica para verificar el certificado
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon icon="mdi:loading" className="animate-spin h-10 w-10 text-blue-600" />
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
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <Icon icon="mdi:certificate" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes certificaciones</h3>
          <p className="text-gray-500 mb-4">Completa cursos para obtener certificados y mostrar tus logros.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Explorar Cursos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certifications.map((certification) => (
            <div key={certification.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
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
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{certification.nombre}</h4>
                    <p className="text-sm text-gray-600">Certificado</p>
                  </div>
                </div>
              </div>

              {/* Información del certificado */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fecha de obtención:</span>
                  <span className="font-medium">{new Date(certification.fechaObtencion).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Horas completadas:</span>
                  <span className="font-medium">{certification.horasCompletadas} horas</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{certification.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Código de verificación:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {certification.codigoVerificacion}
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleDownload(certification)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Icon icon="mdi:download" className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </button>
                <button
                  onClick={() => handleVerify(certification)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
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