# Estructura de Rutas

Esta carpeta contiene toda la configuración y lógica de routing de la aplicación.

## Archivos

### `index.tsx`
- **Propósito**: Archivo principal que define todas las rutas de la aplicación
- **Contenido**: Configuración de `Routes` y `Route` de React Router
- **Características**:
  - Rutas públicas
  - Rutas protegidas (comentadas para uso futuro)
  - Página 404 personalizada

### `routes.ts`
- **Propósito**: Constantes para todas las rutas de la aplicación
- **Contenido**: Objetos con rutas organizadas por categoría
- **Beneficios**:
  - Evita hardcodear strings de rutas
  - Facilita refactoring
  - Mejor autocompletado en IDE

### `ProtectedRoute.tsx`
- **Propósito**: Componente wrapper para rutas que requieren autenticación
- **Funcionalidad**:
  - Verifica si el usuario está autenticado
  - Redirige a login si no está autenticado
  - Renderiza el componente hijo si está autenticado

## Estructura de Rutas

### Rutas Públicas
- `/` - Página principal (HomePage)
- `/login` - Página de login

### Rutas Protegidas (Futuras)
- `/dashboard` - Dashboard del usuario
- `/profile` - Perfil del usuario
- `/courses` - Gestión de cursos
- `/settings` - Configuraciones

### Rutas de Error
- `*` - Página 404 (Not Found)
- `/unauthorized` - Página de acceso denegado

## Uso

### En componentes
```tsx
import { PUBLIC_ROUTES } from '../routes/routes';

// En lugar de href="/"
<a href={PUBLIC_ROUTES.HOME}>Inicio</a>
```

### Para navegación programática
```tsx
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../routes/routes';

const navigate = useNavigate();
navigate(PUBLIC_ROUTES.LOGIN);
```

### Para rutas protegidas
```tsx
import { ProtectedRoute } from '../routes/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

## Beneficios de esta estructura

1. **Centralización**: Todas las rutas están en un solo lugar
2. **Mantenibilidad**: Fácil de modificar y extender
3. **Type Safety**: TypeScript ayuda a detectar errores
4. **Escalabilidad**: Fácil agregar nuevas rutas y funcionalidades
5. **Consistencia**: Uso uniforme de rutas en toda la aplicación 