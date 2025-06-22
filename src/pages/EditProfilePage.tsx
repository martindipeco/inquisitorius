import { useState, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '../types/profileSchema';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Icon } from '@iconify/react';
import { Input } from '../components/Input';
import { ImageUpload } from '../components/ImageUpload';
import { Toast } from '../components/Toast/Toast';
import { useToast } from '../hooks/useToast';
import { userService } from '../services/userService';

export const EditProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<ProfileFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast, showError, showSuccess, hideToast } = useToast();

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await userService.getUserById('usr_1');
        if (user) {
          methods.reset({ ...user, avatar: user.avatarUrl });
        }
      } catch (error) {
        console.error("Error al cargar los datos del perfil", error);
        showError("Error", "No se pudieron cargar los datos del perfil");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [methods, showError]);

  const handleFormSubmit: SubmitHandler<ProfileFormData> = (data) => {
    setFormDataToSubmit(data);
    setIsModalOpen(true);
  };

  const handleSubmitWithValidation = () => {
    const { errors } = methods.formState;
    
    if (Object.keys(errors).length > 0) {
      // Mostrar toast de error con shake
      showError(
        "Hay errores en el formulario", 
        "Por favor, revisa los campos marcados en rojo antes de continuar."
      );
      return;
    }
    
    // Si no hay errores, proceder con el envío
    methods.handleSubmit(handleFormSubmit)();
  };

  const handleConfirmSubmit = async () => {
    if (formDataToSubmit) {
      try {
        console.log('Enviando datos al backend:', formDataToSubmit);
        if (formDataToSubmit.avatar instanceof File) {
          console.log('Subiendo nuevo avatar...');
        }
        // Simular éxito
        showSuccess("¡Éxito!", "Los cambios se han guardado correctamente");
        // await userService.updateUserProfile('usr_1', formDataToSubmit);
      } catch(error) {
        console.error("Error al guardar el perfil", error);
        showError("Error", "No se pudieron guardar los cambios");
      }
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon icon="mdi:loading" className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar Perfil</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
                <div className="space-y-6">
                  <ImageUpload name="avatar" />
                  
                  <Input
                    label="Nombre Completo"
                    type="text"
                    {...methods.register('nombre')}
                    error={methods.formState.errors.nombre?.message}
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

                <div className="mt-8 border-t pt-5">
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
        </main>
        <Footer />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Confirmar Cambios"
        description="¿Estás seguro de que quieres guardar los cambios en tu perfil? Esta acción no se puede deshacer."
      />

      <Toast
        open={toast.open}
        onOpenChange={hideToast}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </FormProvider>
  );
}; 