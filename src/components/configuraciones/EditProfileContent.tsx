import { useState, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '../../types/profileSchema';
import { ConfirmationModal } from '../ConfirmationModal';
import { Icon } from '@iconify/react';
import { Input } from '../Input';
import { useToast } from '../../contexts/ToastContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const EditProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<ProfileFormData | null>(null);
  const { showError, showSuccess } = useToast();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Cargar datos del usuario autenticado
  useEffect(() => {
    if (user) {
      // Convertir los datos del usuario autenticado al formato del formulario
      const profileData: ProfileFormData = {
        login: user.nombre || '',
        clave: '' // No cargamos la contraseña por seguridad
      };
      
      methods.reset(profileData);
    }
  }, [user, methods]);

  const handleFormSubmit: SubmitHandler<ProfileFormData> = (data) => {
    setFormDataToSubmit(data);
    setIsModalOpen(true);
  };

  const handleSubmitWithValidation = () => {
    const { errors } = methods.formState;
    
    if (Object.keys(errors).length > 0) {
      showError(
        "Hay errores en el formulario", 
        "Por favor, revisa los campos marcados en rojo antes de continuar."
      );
      return;
    }
    
    methods.handleSubmit(handleFormSubmit)();
  };

  const handleConfirmSubmit = async () => {
    if (formDataToSubmit && user) {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('No hay token de autenticación');
        }

        const response = await fetch(`https://inquisitorius.onrender.com/api/usuarios/${user.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: formDataToSubmit.login,
            clave: formDataToSubmit.clave
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Token de autenticación inválido');
          }
          throw new Error(`Error al actualizar perfil: ${response.status}`);
        }

        await response.json(); // Solo para verificar que la respuesta es válida
        
        showSuccess("¡Éxito!", "Los cambios se han guardado correctamente. Cerrando sesión...");
        
        // Cerrar sesión inmediatamente después de actualizar
        logout();
        navigate('/login');
        
      } catch(error) {
        console.error("Error al guardar el perfil", error);
        showError("Error", "No se pudieron guardar los cambios");
      }
    }
    setIsModalOpen(false);
  };

  // Mostrar loading mientras se cargan los datos del usuario
  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon icon="mdi:loading" className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Información de Usuario</h3>
          <p className="text-sm text-gray-500">Actualiza tu nombre de usuario y contraseña.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
            <div className="space-y-6">
              {/* ImageUpload desactivado */}
              <div className="opacity-50 pointer-events-none">
                <div className="flex items-center space-x-6 cursor-not-allowed rounded-lg border-2 border-dashed border-gray-300 p-4">
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Icon icon="mdi:camera-plus-outline" className="w-10 h-10 text-gray-400" />
                  </div>
                  <div className="flex-grow">
                    <span className="font-medium text-gray-400">
                      Subir una imagen
                    </span>
                    <p className="text-sm text-gray-400">o arrastra y suelta</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF hasta 2MB</p>
                  </div>
                </div>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:information" className="text-blue-500" />
                    <span className="text-sm text-gray-600">
                      Subir imagen de perfil (en desarrollo)
                    </span>
                  </div>
                </div>
              </div>
              
              <Input
                label="Nombre de Usuario"
                type="text"
                {...methods.register('login')}
                error={methods.formState.errors.login?.message}
                placeholder="Ingresa tu nombre de usuario"
              />

              <Input
                label="Contraseña"
                type="password"
                {...methods.register('clave')}
                error={methods.formState.errors.clave?.message}
                placeholder="Ingresa tu nueva contraseña (solo números)"
              />
            </div>

            <div className="mt-8 pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmitWithValidation}
                  disabled={methods.formState.isSubmitting}
                  className="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                  aria-describedby={methods.formState.isSubmitting ? "saving-status" : undefined}
                >
                  <Icon icon="mdi:content-save" className="mr-2 h-5 w-5" aria-hidden="true" />
                  {methods.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                
                {methods.formState.isSubmitting && (
                  <div id="saving-status" className="sr-only" role="status">
                    Guardando cambios del perfil
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirmar Cambios"
        description="¿Estás seguro de que quieres guardar los cambios? Después de guardar, serás redirigido al login para iniciar sesión con tus nuevos datos."
      />
    </FormProvider>
  );
}; 