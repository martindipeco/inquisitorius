import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SocialButton } from '../components/SocialButton';
import { useState, useCallback, memo } from 'react';
import { loginSchema } from '../types/loginSchema';
import type { LoginForm } from '../types/loginSchema';
import { Icon } from '@iconify/react';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/Toast/Toast';

// Memoizar componentes para evitar re-renders innecesarios
const MemoizedInput = memo(Input);
const MemoizedButton = memo(Button);
const MemoizedSocialButton = memo(SocialButton);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast, showError, showSuccess, showInfo, hideToast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit', // Validación solo al enviar el formulario
  });

  // Memoizar callbacks para mejor performance
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = useCallback(async (data: LoginForm) => {
    try {
      // Simular validación de credenciales
      if (data.email === 'test@example.com' && data.password === 'password123') {
        showSuccess("¡Bienvenido!", "Has iniciado sesión correctamente");
        // Aquí redirigirías al usuario
        console.log('Login exitoso:', data);
      } else {
        showError("Credenciales incorrectas", "El correo o contraseña no son válidos");
      }
    } catch (error) {
      console.error('Error en login:', error);
      showError("Error de conexión", "No se pudo conectar con el servidor");
    }
  }, [showSuccess, showError]);

  const handleSubmitWithValidation = useCallback(() => {
    const { errors } = formState;
    
    if (Object.keys(errors).length > 0) {
      showError(
        "Hay errores en el formulario", 
        "Por favor, revisa los campos marcados en rojo antes de continuar."
      );
      return;
    }
    
    // Si no hay errores, proceder con el envío
    handleSubmit(onSubmit)();
  }, [formState.errors, showError, handleSubmit, onSubmit]);

  const handleSocialLogin = useCallback((provider: string) => {
    showInfo("Funcionalidad en desarrollo", `Inicio de sesión con ${provider} estará disponible pronto`);
  }, [showInfo]);

  // Memoizar elementos que no cambian
  const socialButtons = useCallback(() => (
    <>
      <MemoizedSocialButton 
        icon={<Icon icon="logos:facebook" className="w-6 h-6" aria-hidden="true" />}
        aria-label="Iniciar sesión con Facebook"
        onClick={() => handleSocialLogin('Facebook')}
      />
      <MemoizedSocialButton 
        icon={<Icon icon="logos:google-icon" className="w-6 h-6" aria-hidden="true" />}
        aria-label="Iniciar sesión con Google"
        onClick={() => handleSocialLogin('Google')}
      />
      <MemoizedSocialButton 
        icon={<Icon icon="logos:apple" className="w-6 h-6" aria-hidden="true" />}
        aria-label="Iniciar sesión con Apple"
        onClick={() => handleSocialLogin('Apple')}
      />
    </>
  ), [handleSocialLogin]);

  return (
    <>
      <main 
        className="min-h-screen flex items-center justify-center bg-[#F0F3FB] font-['Inter'] p-4"
        role="main"
        aria-labelledby="login-title"
      >
        <div 
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
          role="region"
          aria-label="Formulario de inicio de sesión"
        >
          <h1 
            id="login-title"
            className="text-2xl sm:text-3xl font-bold mb-6 font-['Poppins'] text-gray-900"
          >
            Iniciar sesión
          </h1>
          
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
            aria-label="Formulario de credenciales"
            noValidate
          >
            <MemoizedInput
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@gmail.com"
              error={formState.errors.email?.message}
              autoComplete="email"
              aria-describedby={formState.errors.email ? "email-error" : undefined}
              aria-invalid={!!formState.errors.email}
              {...register('email')}
            />
            
            {formState.errors.email && (
              <div id="email-error" className="sr-only" role="alert">
                Error en el correo: {formState.errors.email.message}
              </div>
            )}
            
            <MemoizedInput
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={formState.errors.password?.message}
              autoComplete="current-password"
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
            
            <div className="text-right">
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Recuperar contraseña olvidada"
                onClick={(e) => {
                  e.preventDefault();
                  showInfo("Funcionalidad en desarrollo", "Recuperación de contraseña estará disponible pronto");
                }}
              >
                ¿Olvidaste la contraseña?
              </a>
            </div>
            
            <MemoizedButton 
              type="button" 
              disabled={formState.isSubmitting}
              aria-describedby={formState.isSubmitting ? "submitting-status" : undefined}
              onClick={handleSubmitWithValidation}
            >
              {formState.isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </MemoizedButton>
            
            {formState.isSubmitting && (
              <div id="submitting-status" className="sr-only" role="status">
                Procesando inicio de sesión
              </div>
            )}
          </form>
          
          <div 
            className="my-6 flex items-center"
            aria-label="Separador de métodos de inicio de sesión"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-sm text-gray-500 font-medium">O iniciar con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          <div 
            className="grid grid-cols-3 gap-3 mb-6 social-button-grid"
            role="group"
            aria-label="Botones de inicio de sesión con redes sociales"
          >
            {socialButtons()}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a 
                href="#" 
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Ir a página de registro"
                onClick={(e) => {
                  e.preventDefault();
                  showInfo("Funcionalidad en desarrollo", "Registro de usuarios estará disponible pronto");
                }}
              >
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </main>

      <Toast
        open={toast.open}
        onOpenChange={hideToast}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </>
  );
} 