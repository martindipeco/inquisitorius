import { useToast } from '../../hooks/useToast';
import { Toast } from './Toast';
import { Icon } from '@iconify/react';

export const ToastExample = () => {
  const { toast, showError, showSuccess, showWarning, showInfo, hideToast } = useToast();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Ejemplos de Notificaciones</h2>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => showError("Error de Validación", "Hay campos con errores en el formulario")}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <Icon icon="mdi:alert-circle" className="mr-2 inline" />
          Mostrar Error
        </button>
        
        <button
          onClick={() => showSuccess("¡Éxito!", "Los datos se han guardado correctamente")}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Icon icon="mdi:check-circle" className="mr-2 inline" />
          Mostrar Éxito
        </button>
        
        <button
          onClick={() => showWarning("Advertencia", "Algunos campos podrían necesitar atención")}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
        >
          <Icon icon="mdi:alert" className="mr-2 inline" />
          Mostrar Advertencia
        </button>
        
        <button
          onClick={() => showInfo("Información", "Este es un mensaje informativo")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Icon icon="mdi:information" className="mr-2 inline" />
          Mostrar Info
        </button>
      </div>

      <Toast
        open={toast.open}
        onOpenChange={hideToast}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </div>
  );
}; 