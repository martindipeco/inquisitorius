import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Navbar } from '../components/Navbar';
import { TabNavigation } from '../components/TabNavigation';
import { AnimatedContent } from '../components/AnimatedContent';
import { EditProfileContent } from '../components/configuraciones/EditProfileContent';
import { MyCoursesContent } from '../components/configuraciones/MyCoursesContent';
import { CertificationsContent } from '../components/configuraciones/CertificationsContent';
import { SecurityContent } from '../components/configuraciones/SecurityContent';
import { NotificationsContent } from '../components/configuraciones/NotificationsContent';
import { PROTECTED_ROUTES } from '../routes/routes';

type ConfigSection = 'perfil' | 'cursos' | 'certificaciones' | 'seguridad' | 'notificaciones';

export const ConfiguracionesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<ConfigSection>('perfil');

  // Mapeo de rutas a secciones
  const routeToSection: Record<string, ConfigSection> = {
    [PROTECTED_ROUTES.CONFIGURACIONES]: 'perfil',
    [PROTECTED_ROUTES.CONFIGURACIONES_PERFIL]: 'perfil',
    [PROTECTED_ROUTES.CONFIGURACIONES_CURSOS]: 'cursos',
    [PROTECTED_ROUTES.CONFIGURACIONES_CERTIFICACIONES]: 'certificaciones',
    [PROTECTED_ROUTES.CONFIGURACIONES_SEGURIDAD]: 'seguridad',
    [PROTECTED_ROUTES.CONFIGURACIONES_NOTIFICACIONES]: 'notificaciones',
  };

  // Mapeo de secciones a rutas
  const sectionToRoute: Record<ConfigSection, string> = {
    perfil: PROTECTED_ROUTES.CONFIGURACIONES_PERFIL,
    cursos: PROTECTED_ROUTES.CONFIGURACIONES_CURSOS,
    certificaciones: PROTECTED_ROUTES.CONFIGURACIONES_CERTIFICACIONES,
    seguridad: PROTECTED_ROUTES.CONFIGURACIONES_SEGURIDAD,
    notificaciones: PROTECTED_ROUTES.CONFIGURACIONES_NOTIFICACIONES,
  };

  // Detectar la sección activa basada en la URL
  useEffect(() => {
    const currentSection = routeToSection[location.pathname];
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [location.pathname]);

  const handleConfiguracionesClick = () => {
    navigate(PROTECTED_ROUTES.CONFIGURACIONES);
  };

  const tabItems = [
    {
      id: 'perfil',
      label: 'Editar Perfil',
      icon: <Icon icon="mdi:account-edit" className="w-5 h-5" />,
      active: activeSection === 'perfil',
    },
    {
      id: 'cursos',
      label: 'Mis Cursos',
      icon: <Icon icon="mdi:book-open-variant" className="w-5 h-5" />,
      active: activeSection === 'cursos',
    },
    {
      id: 'certificaciones',
      label: 'Certificaciones',
      icon: <Icon icon="mdi:certificate" className="w-5 h-5" />,
      active: activeSection === 'certificaciones',
    },
    {
      id: 'seguridad',
      label: 'Seguridad',
      icon: <Icon icon="mdi:shield-check" className="w-5 h-5" />,
      active: activeSection === 'seguridad',
    },
    {
      id: 'notificaciones',
      label: 'Notificaciones',
      icon: <Icon icon="mdi:bell-outline" className="w-5 h-5" />,
      active: activeSection === 'notificaciones',
    },
  ];

  const handleTabClick = (itemId: string) => {
    const section = itemId as ConfigSection;
    const targetRoute = sectionToRoute[section];
    navigate(targetRoute);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return <EditProfileContent />;
      case 'cursos':
        return <MyCoursesContent />;
      case 'certificaciones':
        return <CertificationsContent />;
      case 'seguridad':
        return <SecurityContent />;
      case 'notificaciones':
        return <NotificationsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onConfiguracionesClick={handleConfiguracionesClick} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TabNavigation items={tabItems} onItemClick={handleTabClick} />
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <AnimatedContent key={activeSection}>
              {renderContent()}
            </AnimatedContent>
          </div>
        </div>
      </div>
    </div>
  );
}; 