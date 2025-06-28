// Rutas públicas (sin autenticación requerida)
export const PUBLIC_ROUTES = {
  WELCOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/acerca',
  HELP: '/ayuda',
} as const;

// Rutas protegidas (requieren autenticación)
export const PROTECTED_ROUTES = {
  HOME: '/home',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  COURSES: '/courses',
  SETTINGS: '/settings',
  CONFIGURACIONES: '/configuraciones',
  CONFIGURACIONES_PERFIL: '/configuraciones/perfil',
  CONFIGURACIONES_CURSOS: '/configuraciones/cursos',
  CONFIGURACIONES_CERTIFICACIONES: '/configuraciones/certificaciones',
  CONFIGURACIONES_SEGURIDAD: '/configuraciones/seguridad',
  CONFIGURACIONES_NOTIFICACIONES: '/configuraciones/notificaciones',
  CHAT: '/chat',
} as const;

// Rutas de error
export const ERROR_ROUTES = {
  NOT_FOUND: '*',
  UNAUTHORIZED: '/unauthorized',
} as const;

// Todas las rutas
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
  ...ERROR_ROUTES,
} as const; 