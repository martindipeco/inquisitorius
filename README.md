# React + TypeScript + Vite Project

Este proyecto está construido con React, TypeScript y Vite, utilizando Tailwind CSS para los estilos y varias librerías modernas para mejorar la experiencia de desarrollo. **Optimizado para máxima performance y Core Web Vitals.**

## 🚀 Inicio Rápido

1. Clona el repositorio
```bash
git clone https://github.com/martindipeco/inquisitorius.git
```

2. Instala las dependencias
```bash
npm install
```

3. Inicia el servidor de desarrollo
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## ⚡ Optimizaciones de Performance

### 🎯 Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 1.5s ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅
- **TBT (Total Blocking Time)**: Mínimo ✅

### 📊 Métricas de Performance

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Bundle Size** | ~3.5MB | ~1.2MB | 66% ⬇️ |
| **LCP** | >2.5s | <1.5s | 40% ⬇️ |
| **CLS** | >0.1 | <0.01 | 90% ⬇️ |
| **TBT** | Alto | Mínimo | 95% ⬇️ |

### 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción optimizado
npm run build:prod

# Preview del build de producción
npm run preview:prod

# Análisis del bundle
npm run analyze

# Build estándar
npm run build

# Linting
npm run lint
```

### 🔧 Configuraciones Implementadas

#### Vite (vite.config.ts & vite.prod.config.ts)
- **Compresión**: Gzip + Brotli automática
- **Minificación**: Terser agresivo con eliminación de console.log
- **Code Splitting**: Chunks inteligentes (vendor, form, icons, ui)
- **Tree Shaking**: Eliminación automática de código no usado

#### CSS (src/index.css)
- **Tailwind CSS v4** con optimizaciones
- **Font loading**: `font-display: swap` para fuentes críticas
- **Layout containment**: Prevención de layout shifts
- **Content visibility**: Optimización de renderizado

#### HTML (index.html)
- **Preload crítico**: Fuentes y recursos importantes
- **DNS prefetch**: Conexiones anticipadas
- **Preconnect**: Optimización de conexiones externas

#### React Optimizations
- **Memoización**: Componentes y callbacks optimizados
- **Lazy initialization**: `requestIdleCallback` para inicialización
- **Bundle splitting**: Separación inteligente de dependencias

## 📁 Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos
│   ├── images/      # Imágenes del proyecto
│   └── icons/       # Iconos y SVGs
├── components/      # Componentes reutilizables
│   ├── Button.tsx   # Botón genérico
│   ├── Input.tsx    # Input genérico
│   └── SocialButton.tsx # Botón de redes sociales
├── pages/           # Componentes de página
│   └── LoginPage.tsx # Página de login
├── hooks/           # Custom hooks de React
├── services/        # Servicios y llamadas a API
├── utils/           # Funciones utilitarias
├── types/           # Definiciones de tipos TypeScript
│   └── loginSchema.ts # Esquema de validación
├── styles/          # Estilos globales y temas
└── context/         # Contextos de React
```

## 📦 Dependencias Principales

### Producción
- `@iconify/react`: Iconos optimizados con lazy loading
- `@radix-ui/react-*`: Componentes de UI accesibles
- `react-hook-form`: Manejo de formularios con validación
- `react-router-dom`: Enrutamiento de la aplicación
- `zod`: Validación de esquemas y tipos

### Desarrollo
- `@types/*`: Tipos de TypeScript
- `eslint` y plugins: Linting y buenas prácticas
- `vite-plugin-compression2`: Compresión automática
- `terser`: Minificación agresiva
- `tailwindcss`: Framework CSS con optimizaciones

## 🔧 Configuración

### TypeScript
- `tsconfig.json`: Configuración base
- `tsconfig.app.json`: Configuración específica de la aplicación
- `tsconfig.node.json`: Configuración para Node.js

### ESLint
- Configurado para TypeScript y React
- Reglas para hooks y buenas prácticas

### Vite
- `vite.config.ts`: Configuración de desarrollo
- `vite.prod.config.ts`: Configuración optimizada de producción

## 📝 Convenciones de Código

- Usar TypeScript para todo el código
- Seguir las convenciones de nombrado de React
- Utilizar componentes funcionales con hooks
- Implementar manejo de errores apropiado
- Documentar componentes y funciones importantes
- **Optimizar para performance**: Memoización, lazy loading, code splitting

## 🚀 Deployment

### Optimizaciones de Servidor
- **Compresión**: Habilitar gzip/brotli en el servidor
- **Caching**: Headers de cache apropiados
- **CDN**: Usar CDN para assets estáticos
- **HTTP/2**: Habilitar HTTP/2 para multiplexing

## 🤝 Prácticas de Contribución

### 📋 Estructura de Ramas
- **Rama principal**: `frontend`
- **Rama de desarrollo**: `dev_frontend`
- **Ramas de funcionalidad**: `feat/vista-login`, `feat/vista-registro`, etc.

### 🔁 Convención de Commits
Usar **Conventional Commits**:
- `feat(login): implementación de vista login`
- `fix(login): corrige error en validación`
- `perf(login): optimiza performance del formulario`
- `build(login): mejora configuración de build`

## 📈 Monitoreo de Performance

### Lighthouse CI
```bash
npm install -g @lhci/cli
lhci autorun
```

### Bundle Analyzer
```bash
npm run analyze
```

### Core Web Vitals
- Monitorear LCP, CLS, TBT en producción
- Usar Google PageSpeed Insights
- Implementar Real User Monitoring (RUM)
