// Rutas públicas
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
} as const;

// Rutas protegidas (futuras)
export const PROTECTED_ROUTES = {
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