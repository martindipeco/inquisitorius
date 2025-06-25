import { useState, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '../../types/profileSchema';
import { ConfirmationModal } from '../ConfirmationModal';
import { Icon } from '@iconify/react';
import { Input } from '../Input';
import { ImageUpload } from '../ImageUpload';
import { useToast } from '../../contexts/ToastContext';
import { useAuthContext } from '../../hooks/useAuthContext';

export const EditProfileContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<ProfileFormData | null>(null);
  const { showError, showSuccess } = useToast();
  const { user } = useAuthContext();

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Cargar datos del usuario autenticado
  useEffect(() => {
    if (user) {
      // Convertir los datos del usuario autenticado al formato del formulario
      const profileData: ProfileFormData = {
        nombreCompleto: user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : '',
        email: user.email,
        bio: '', // Por ahora vacío, se puede expandir después
        foto: undefined // Por ahora sin foto, se puede agregar después
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
    if (formDataToSubmit) {
      try {
        console.log('Enviando datos al backend:', formDataToSubmit);
        if (formDataToSubmit.foto instanceof File) {
          console.log('Subiendo nueva foto...');
        }
        showSuccess("¡Éxito!", "Los cambios se han guardado correctamente");
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
          <h3 className="text-lg font-medium text-gray-900">Información Personal</h3>
          <p className="text-sm text-gray-500">Actualiza tu información personal y preferencias.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
            <div className="space-y-6">
              <ImageUpload name="foto" />
              
              <Input
                label="Nombre Completo"
                type="text"
                {...methods.register('nombreCompleto')}
                error={methods.formState.errors.nombreCompleto?.message}
              />

              <Input
                label="Correo Electrónico"
                type="email"
                {...methods.register('email')}
                error={methods.formState.errors.email?.message}
              />

              <div>
                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-700">Biografía</label>
                <textarea
                  id="bio"
                  {...methods.register('bio')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Cuéntanos un poco sobre ti..."
                  aria-describedby={methods.formState.errors.bio ? "bio-error" : undefined}
                  aria-invalid={!!methods.formState.errors.bio}
                />
                {methods.formState.errors.bio && (
                  <p id="bio-error" className="mt-2 text-sm text-red-600" role="alert">
                    {methods.formState.errors.bio.message}
                  </p>
                )}
              </div>
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
        description="¿Estás seguro de que quieres guardar los cambios en tu perfil? Esta acción no se puede deshacer."
      />
    </FormProvider>
  );
}; 