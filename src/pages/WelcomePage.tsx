import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '@iconify/react';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from '../routes/routes';
import { AnimatedText } from '../components/AnimatedText';
import { ScrollAnimation } from '../components/ScrollAnimation';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { WelcomeNavbar } from '../components/WelcomeNavbar';

export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showWarning } = useToast();
  const { isAuthenticated } = useAuthContext();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Verificar si el usuario viene de una ruta protegida
  const showAuthAlert = location.state?.from && location.state.from !== PUBLIC_ROUTES.WELCOME;

  // Mostrar toast cuando viene de una ruta protegida
  useEffect(() => {
    if (showAuthAlert) {
      const timer = setTimeout(() => {
        showWarning(
          "Acceso requerido", 
          `Necesitas iniciar sesión para acceder a ${location.state.from}`
        );
        // Limpiar el estado después de mostrar el toast
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showAuthAlert, location.state?.from, showWarning, navigate, location.pathname]);

  const features = [
    {
      icon: 'mdi:school',
      title: 'Aprende a tu ritmo',
      description: 'Cursos flexibles que se adaptan a tu horario y estilo de aprendizaje personal'
    },
    {
      icon: 'mdi:account-group',
      title: 'Comunidad activa',
      description: 'Conecta con otros estudiantes, comparte experiencias y construye tu red profesional'
    },
    {
      icon: 'mdi:certificate',
      title: 'Certificaciones reconocidas',
      description: 'Obtén certificados que validan tus habilidades y te abren nuevas oportunidades'
    },
    {
      icon: 'mdi:chart-line',
      title: 'Seguimiento inteligente',
      description: 'Monitorea tu progreso con análisis detallados y celebra cada logro alcanzado'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Estudiantes activos', color: 'text-blue-600' },
    { number: '500+', label: 'Cursos disponibles', color: 'text-purple-600' },
    { number: '95%', label: 'Satisfacción', color: 'text-green-600' },
    { number: '24/7', label: 'Soporte disponible', color: 'text-orange-600' }
  ];

  const demoFeatures = [
    {
      title: 'Sistema de Chat en Tiempo Real',
      description: 'Comunícate con otros estudiantes e instructores de forma instantánea',
      icon: 'mdi:chat-outline',
      color: 'bg-blue-500',
      demo: 'chat'
    },
    {
      title: 'Catálogo de Cursos',
      description: 'Explora cientos de cursos en diferentes categorías y niveles',
      icon: 'mdi:book-open-variant',
      color: 'bg-green-500',
      demo: 'courses'
    },
    {
      title: 'Seguimiento de Progreso',
      description: 'Monitorea tu avance con métricas detalladas y certificaciones',
      icon: 'mdi:chart-line',
      color: 'bg-purple-500',
      demo: 'progress'
    },
    {
      title: 'Configuraciones Personalizadas',
      description: 'Personaliza tu perfil, notificaciones y preferencias de aprendizaje',
      icon: 'mdi:cog',
      color: 'bg-orange-500',
      demo: 'settings'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentFeature((prev) => (prev + 1) % features.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length, isDragging]);

  // Funciones para el carrusel deslizable
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const goToFeature = (index: number) => {
    setCurrentFeature(index);
  };

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <WelcomeNavbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                <AnimatedText 
                  text="Aprende, crece,"
                  className="block"
                  delay={0.2}
                  staggerDelay={0.03}
                />
                <AnimatedText 
                  text="transforma"
                  className="block text-blue-600"
                  delay={1.5}
                  staggerDelay={0.05}
                />
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
              >
                <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-8">
                  Descubre el poder del aprendizaje continuo. Únete a nuestra comunidad 
                  y alcanza tus metas profesionales con cursos diseñados por expertos.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Carousel */}
        <ScrollAnimation direction="up" delay={0.2}>
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-center space-x-4 mb-6" role="tablist" aria-label="Navegación de características">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        index === currentFeature ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      role="tab"
                      aria-selected={index === currentFeature}
                      aria-label={`Ir a característica ${index + 1}: ${features[index].title}`}
                    />
                  ))}
                </div>
                
                <div className="relative">
                  <button
                    onClick={prevFeature}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    aria-label="Anterior característica"
                  >
                    <Icon icon="mdi:chevron-left" className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  </button>
                  
                  <div 
                    ref={carouselRef}
                    className="text-center cursor-grab active:cursor-grabbing px-12"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    role="tabpanel"
                    aria-label={`Característica ${currentFeature + 1} de ${features.length}`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <Icon 
                          icon={features[currentFeature].icon} 
                          className="w-8 h-8 text-white" 
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {features[currentFeature].title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {features[currentFeature].description}
                    </p>
                  </div>

                  <button
                    onClick={nextFeature}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                    aria-label="Siguiente característica"
                  >
                    <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Demo Features Section */}
        <ScrollAnimation direction="up" delay={0.3}>
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Descubre nuestras funcionalidades
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {demoFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon icon={feature.icon} className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Stats Section */}
        <ScrollAnimation direction="up" delay={0.2}>
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-12 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Nuestros números hablan por sí solos
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation direction="up" delay={0.3}>
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {isAuthenticated 
                  ? '¡Bienvenido de vuelta!' 
                  : '¿Listo para comenzar tu viaje de aprendizaje?'
                }
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {isAuthenticated 
                  ? 'Continúa tu aprendizaje y explora todas las funcionalidades disponibles.'
                  : 'Únete a miles de estudiantes que ya están transformando sus carreras y alcanzando sus sueños'
                }
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {isAuthenticated ? (
                  <Button
                    onClick={() => navigate(PROTECTED_ROUTES.HOME)}
                    className="sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    Ir al Home
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
                      className="sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Iniciar sesión
                    </Button>
                    <button
                      onClick={() => navigate(PUBLIC_ROUTES.REGISTER)}
                      className="w-full sm:w-auto h-[56px] py-3 px-6 rounded-[10px] border-2 border-gray-300 text-gray-700 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Registrarse ahora
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </section>
        </ScrollAnimation>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Mentora. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 