import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SocialButton } from '../components/SocialButton';
import { useState, useCallback, memo } from 'react';
import { registerSchema } from '../types/registerSchema';
import type { RegisterForm } from '../types/registerSchema';
import { Icon } from '@iconify/react';
import { useToast } from '../contexts/ToastContext';
import { registerService } from '../services/registerService';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../routes/routes';
import { WelcomeNavbar } from '../components/WelcomeNavbar';

// Memoizar componentes para evitar re-renders innecesarios
const MemoizedInput = memo(Input);
const MemoizedButton = memo(Button);
const MemoizedSocialButton = memo(SocialButton);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showError, showSuccess, showInfo } = useToast();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      usuario: '', 
      password: '', 
      confirmPassword: ''
    },
    mode: 'onSubmit',
  });

  // Memoizar callbacks para mejor performance
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const onSubmit = useCallback(async (data: RegisterForm) => {
    try {
      const result = await registerService.registrarUsuario({
        usuario: data.usuario,
        password: data.password
        // El rol se asigna automáticamente como 'USER' en el servicio
      });

      if (result.success) {
        showSuccess("¡Registro exitoso!", "Tu cuenta ha sido creada correctamente");
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          navigate(PUBLIC_ROUTES.LOGIN);
        }, 2000);
      } else {
        showError("Error en el registro", result.message || "No se pudo completar el registro");
      }
    } catch (error) {
      console.error('Error en registro:', error);
      showError("Error de conexión", "No se pudo conectar con el servidor");
    }
  }, [showSuccess, showError, navigate]);

const { errors } = formState;

const handleSubmitWithValidation = useCallback(() => {
  if (Object.keys(errors).length > 0) {
    showError(
      "Hay errores en el formulario", 
      "Por favor, revisa los campos marcados en rojo antes de continuar."
    );
    return;
  }
  handleSubmit(onSubmit)();
}, [errors, showError, handleSubmit, onSubmit]);

  const handleSocialRegister = useCallback((provider: string) => {
    showInfo("Funcionalidad en desarrollo", `Registro con ${provider} estará disponible pronto`);
  }, [showInfo]);

  const handleGoToLogin = useCallback(() => {
    navigate(PUBLIC_ROUTES.LOGIN);
  }, [navigate]);

  // Memoizar elementos que no cambian
  const socialButtons = useCallback(() => (
    <>
      <MemoizedSocialButton 
        icon={<Icon icon="logos:facebook" className="w-6 h-6" aria-hidden="true" />}
        aria-label="Registrarse con Facebook"
        onClick={() => handleSocialRegister('Facebook')}
      />
      <MemoizedSocialButton 
        icon={<Icon icon="logos:google-icon" className="w-6 h-6" aria-hidden="true" />}
        aria-label="Registrarse con Google"
        onClick={() => handleSocialRegister('Google')}
      />
      <MemoizedSocialButton 
        icon={<Icon icon="logos:apple" className="w-6 h-6" aria-hidden="true" />}
        aria-label="Registrarse con Apple"
        onClick={() => handleSocialRegister('Apple')}
      />
    </>
  ), [handleSocialRegister]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F3FB] font-['Inter']">
      {/* Navigation */}
      <WelcomeNavbar />
      
      {/* Main Content */}
      <main 
        className="flex-1 flex items-center justify-center p-4"
        role="main"
        aria-labelledby="register-title"
      >
        <div 
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
          role="region"
          aria-label="Formulario de registro"
        >
          <h1 
            id="register-title"
            className="text-2xl sm:text-3xl font-bold mb-6 font-['Poppins'] text-gray-900"
          >
            Crear cuenta
          </h1>
          
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-4"
            aria-label="Formulario de registro"
            noValidate
          >
            {/* Usuario */}
            <MemoizedInput
              label="Usuario"
              type="text"
              placeholder="Martin21"
              error={formState.errors.usuario?.message}
              autoComplete="username"
              aria-describedby={formState.errors.usuario ? "usuario-error" : undefined}
              aria-invalid={!!formState.errors.usuario}
              {...register('usuario')}
            />
            
            {formState.errors.usuario && (
              <div id="usuario-error" className="sr-only" role="alert">
                Error en el usuario: {formState.errors.usuario.message}
              </div>
            )}
            
            {/* Contraseña */}
            <MemoizedInput
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={formState.errors.password?.message}
              autoComplete="new-password"
              aria-describedby={formState.errors.password ? "password-error" : undefined}
              aria-invalid={!!formState.errors.password}
              rightIcon={
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                  className="p-1 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <Icon icon="mdi:eye-off" className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Icon icon="mdi:eye" className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              }
              {...register('password')}
            />
            
            {formState.errors.password && (
              <div id="password-error" className="sr-only" role="alert">
                Error en la contraseña: {formState.errors.password.message}
              </div>
            )}
            
            {/* Confirmar Contraseña */}
            <MemoizedInput
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={formState.errors.confirmPassword?.message}
              autoComplete="new-password"
              aria-describedby={formState.errors.confirmPassword ? "confirm-password-error" : undefined}
              aria-invalid={!!formState.errors.confirmPassword}
              rightIcon={
                <button 
                  type="button" 
                  onClick={toggleConfirmPasswordVisibility}
                  className="p-1 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <Icon icon="mdi:eye-off" className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Icon icon="mdi:eye" className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              }
              {...register('confirmPassword')}
            />
            
            {formState.errors.confirmPassword && (
              <div id="confirm-password-error" className="sr-only" role="alert">
                Error en la confirmación de contraseña: {formState.errors.confirmPassword.message}
              </div>
            )}
            
            <MemoizedButton 
              type="button" 
              disabled={formState.isSubmitting}
              aria-describedby={formState.isSubmitting ? "submitting-status" : undefined}
              onClick={handleSubmitWithValidation}
            >
              {formState.isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </MemoizedButton>
            
            {formState.isSubmitting && (
              <div id="submitting-status" className="sr-only" role="status">
                Procesando registro de cuenta
              </div>
            )}
          </form>
          
          <div 
            className="my-6 flex items-center"
            aria-label="Separador de métodos de registro"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-sm text-gray-500 font-medium">O registrarse con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          <div className="flex justify-center space-x-3 mb-6">
            {socialButtons()}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                onClick={handleGoToLogin}
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 