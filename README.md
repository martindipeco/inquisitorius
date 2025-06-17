# React + TypeScript + Vite Project

Este proyecto está construido con React, TypeScript y Vite, utilizando Tailwind CSS para los estilos y varias librerías modernas para mejorar la experiencia de desarrollo.

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

## 📁 Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos
│   ├── images/      # Imágenes del proyecto
│   └── icons/       # Iconos y SVGs
├── components/      # Componentes reutilizables
│   ├── ui/         # Componentes de UI básicos
│   └── layout/     # Componentes de estructura
├── pages/          # Componentes de página
├── hooks/          # Custom hooks de React
├── services/       # Servicios y llamadas a API
├── utils/          # Funciones utilitarias
├── types/          # Definiciones de tipos TypeScript
├── styles/         # Estilos globales y temas
└── context/        # Contextos de React
```

## 📦 Librerías Principales

### Dependencias Principales
- `@heroicons/react`: Iconos de alta calidad para la interfaz
- `@radix-ui/react-*`: Componentes de UI accesibles y personalizables
  - `dialog`: Modales y diálogos
  - `dropdown-menu`: Menús desplegables
  - `label`: Etiquetas accesibles
- `react-hook-form`: Manejo de formularios con validación
- `react-router-dom`: Enrutamiento de la aplicación
- `tailwind-merge`: Utilidad para combinar clases de Tailwind
- `zod`: Validación de esquemas y tipos

### Dependencias de Desarrollo
- `@types/*`: Tipos de TypeScript para React y Node
- `eslint` y plugins: Linting y buenas prácticas
  - `eslint-plugin-react-hooks`: Reglas para hooks de React
  - `eslint-plugin-react-refresh`: Soporte para Fast Refresh

## 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run lint`: Ejecuta el linter
- `npm run preview`: Vista previa de la build de producción

## 🎨 Estilos

El proyecto utiliza Tailwind CSS para los estilos. Los estilos globales se encuentran en:
- `src/index.css`: Configuración base de Tailwind
- `src/styles/`: Estilos personalizados y temas

## 🔧 Configuración

### TypeScript
El proyecto utiliza TypeScript con una configuración estricta. Los archivos de configuración son:
- `tsconfig.json`: Configuración base
- `tsconfig.app.json`: Configuración específica de la aplicación
- `tsconfig.node.json`: Configuración para Node.js

### ESLint
La configuración de ESLint se encuentra en `.eslintrc.cjs` y está configurada para:
- TypeScript
- React
- Buenas prácticas de desarrollo

## 📝 Convenciones de Código

- Usar TypeScript para todo el código
- Seguir las convenciones de nombrado de React
- Utilizar componentes funcionales con hooks
- Implementar manejo de errores apropiado
- Documentar componentes y funciones importantes

## 🤝 Prácticas de Contribución

### 📋 Estructura de Ramas
- **Rama principal**: `frontend`
- **Rama de desarrollo**: `dev_frontend`
- **Ramas de funcionalidad**:
    - `feat/vista-login`
    - `feat/vista-registro`
    - `feat/vista-inicio`
- **Proceso**:
    1. Cada quien trabaja en su rama (`feat/...`)
    2. Al terminar, se hace *Pull Request* hacia `dev_frontend`
    3. Otro integrante del equipo revisa y aprueba los cambios

### 🔁 Convención de Commits

Usaremos **Conventional Commits** para mantener orden y trazabilidad. Ejemplos:

- `feat(login): implementación de vista login`
- `feat(login): implementación de componentes básicos`
- `fix(login): corrige error en validación de formulario`
- `refactor(login): mejora estructura del componente`
