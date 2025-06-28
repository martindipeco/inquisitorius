<img src="https://github.com/user-attachments/assets/985c8518-80db-4926-80c7-e46271f016d5" alt="Logo" width="200" height="auto" style="max-width: 200px; height: auto;">

# Plataforma de Mentoría y Certificación

**Mentora** es una plataforma educativa integral que conecta estudiantes y mentores mediante un entorno digital seguro y colaborativo. 

- [🌐 App en producción](https://pruebamentora.netlify.app/)
- [📑 API desplegada](https://inquisitorius.onrender.com/)

El sistema está dividido en dos partes:

- **Frontend SPA** desarrollado con **React + TypeScript + Vite**, enfocado en la experiencia del usuario.
- **Backend** desarrollado con **Java + Spring Boot**, orientado a la gestión académica, mentorías y certificaciones.

Este repositorio busca fomentar el aprendizaje significativo, la trazabilidad del progreso y el reconocimiento de habilidades mediante mentorías guiadas y certificaciones verificadas.

---

## 🚀 Características Principales

- 🔐 Autenticación y autorización con JWT
- �� Perfiles diferenciados para estudiantes y mentores
- �� Comunidad con filtrado de habilidades, intereses y ubicación
- 🎯 Participación en desafíos, cursos y mentorías
- 💬 Sistema de mensajería entre usuarios en tiempo real
- 🏆 Visualización de logros e insignias
- 📚 Gestión de cursos y niveles de dificultad
- 🏅 Registro y validación de certificaciones académicas
- 🛡️ Rutas protegidas y control de acceso por roles (`ADMIN`, `MENTOR`, `USER`)
- ⚡ SPA (Single Page Application) con navegación fluida y sin recarga

---

## 🛠️ Tecnologías Utilizadas

### 🎨 Frontend

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **React Router**
- **PostCSS + Autoprefixer**

### ⚙️ Backend

- **Java 17+**
- **Spring Boot**
- **Spring Security + JWT**
- **MySQL**
- **Maven**
- **JPA / Hibernate**
- **Insomnia para pruebas REST**

---

## 🔗 Recursos en línea

- [🌐 Frontend (Netlify)](https://pruebamentora.netlify.app/)
- [📑 Swagger UI – Documentación de la API](https://inquisitorius.onrender.com/swagger-ui/index.html)
  
---

# 🎨 FRONTEND

## 🗂️ Estructura del Proyecto Frontend

```plaintext
src/
├── components/           # Componentes React reutilizables
│   ├── chat/            # Sistema de mensajería
│   │   ├── Chat.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── ConversationList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   └── index.ts
│   ├── configuraciones/ # Componentes de configuración
│   │   ├── CertificationsContent.tsx
│   │   ├── EditProfileContent.tsx
│   │   ├── MyCoursesContent.tsx
│   │   ├── NotificationsContent.tsx
│   │   └── SecurityContent.tsx
│   ├── Toast/           # Sistema de notificaciones
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── ToastExample.tsx
│   │   └── ToastProvider.tsx
│   ├── AnimatedContent.tsx
│   ├── AnimatedText.tsx
│   ├── AuthAlert.tsx
│   ├── Button.tsx
│   ├── ConfirmationModal.tsx
│   ├── Curso.tsx
│   ├── DropdownMenu.tsx
│   ├── Footer.tsx
│   ├── ImageUpload.tsx
│   ├── ImageWithFallback.tsx
│   ├── Input.tsx
│   ├── Navbar.tsx
│   ├── ScrollAnimation.tsx
│   ├── SocialButton.tsx
│   ├── TabNavigation.tsx
│   └── WelcomeNavbar.tsx
├── contexts/            # Contextos de React para estado global
│   ├── AuthContext.tsx
│   ├── AuthContextDef.ts
│   └── ToastContext.tsx
├── hooks/               # Custom hooks personalizados
│   ├── useAuth.ts
│   ├── useAuthContext.ts
│   └── useToast.ts
├── mocks/               # Datos de prueba para simular APIs
│   ├── certifications.json
│   ├── cursos.json
│   ├── enrolledCourses.json
│   ├── messages.json
│   └── users.json
├── pages/               # Componentes que representan páginas completas
│   ├── AboutPage.tsx
│   ├── ChatPage.tsx
│   ├── ConfiguracionesPage.tsx
│   ├── HelpPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── RegisterPage.tsx
│   └── WelcomePage.tsx
├── routes/              # Lógica y configuración de enrutamiento
│   ├── index.tsx
│   ├── ProtectedRoute.tsx
│   ├── README.md
│   └── routes.ts
├── services/            # Lógica para interactuar con APIs externas
│   ├── authService.ts
│   ├── certificationService.ts
│   ├── cursosService.ts
│   ├── messageService.ts
│   ├── registerService.ts
│   └── userService.ts
├── types/               # Definiciones de tipos y esquemas de TypeScript
│   ├── certificationSchema.ts
│   ├── loginSchema.ts
│   ├── messageSchema.ts
│   ├── profileSchema.ts
│   └── registerSchema.ts
├── App.tsx              # Componente raíz de la aplicación
├── index.css            # Estilos globales y de Tailwind
├── main.tsx             # Punto de entrada principal de la aplicación
└── vite-env.d.ts        # Tipos de Vite
```

## 🎨 Estilo y Diseño

El diseño de Mentora está pensado para ser limpio, accesible y responsivo, adaptado tanto para estudiantes como mentores.

### 🧰 Bibliotecas y Herramientas Visuales

- **React Hook Form**: Manejo eficiente de formularios con validación y optimización de re-renders
- **Zod**: Validación de esquemas TypeScript para formularios y datos
- **Radix UI**: Componentes de UI accesibles y personalizables (dropdowns, modales, etc.)
- **Iconify**: Biblioteca de iconos optimizada con lazy loading para mejor performance
- **Framer Motion**: Animaciones fluidas y transiciones para mejorar la experiencia de usuario
- **React Router**: Navegación SPA con rutas protegidas y transiciones suaves
- **Toast Notifications**: Sistema de notificaciones para feedback inmediato al usuario
- **CSS Modules**: Organización modular de estilos para evitar conflictos de CSS

## ✨ Funcionalidades Implementadas

- **Validaciones** en formularios:
  - Correos deben contener `@`
  - Contraseñas deben tener entre 6 y 12 caracteres (alfanumérico)
- **Efectos visuales** para:
  - Transiciones de pantalla
  - Confirmación de registro exitoso
  - Animaciones de contenido y texto
- **SPA completamente funcional**:
  - Navegación rápida y fluida sin recarga
  - Rutas protegidas por rol (`USER`, `MENTOR`, `ADMIN`)
- **Módulos desarrollados**:
  - Login y registro de usuarios
  - Comunidad con filtros
  - Mentorías:
    - Creación de mentorías
    - Visualización de mentorías activas
  - Mensajería interna:
    - Lista de chats
    - Mensajes con simulación en tiempo real
  - Progreso académico:
    - Cursos tomados
    - Certificaciones obtenidas
  - Dashboard y perfil de usuario:
    - Formularios editables
    - Uso de modales y componentes visuales
- **Estilos con TailwindCSS** para garantizar adaptabilidad en múltiples dispositivos
- **Simulación con datos mock** en frontend, pensada para integrarse con backend Spring Boot
- **Sistema de notificaciones Toast** para feedback del usuario
- **Componentes animados** para mejorar la experiencia de usuario

## 👥 Roles de Usuario (Frontend)

Mentora implementa un sistema de control de acceso basado en roles para ofrecer experiencias diferenciadas según el tipo de usuario.

### 🎓 Usuario (Estudiante) - **✅ Implementado**

- Accede a un **inicio personalizado** con mensaje motivacional
- Consulta la **lista de cursos disponibles**
- Se inscribe y visualiza su **progreso** en cursos y mentorías
- Accede a sus **certificaciones obtenidas**
- Puede **editar su perfil personal**
- Participa en la **comunidad**, interactúa en desafíos y utiliza el sistema de **mensajería interna**

### 👨‍🏫 Mentor - **⏳ Pendiente de implementación**

- Visualiza su lista de **mentorías activas**
- Puede **crear nuevas mentorías** a través de un formulario especializado
- Administra mentorías asociadas a cursos
- Tiene acceso al sistema de **mensajería interna**
- Puede validar avances de aprendices y contribuir con certificaciones

### 👑 Admin - **🔒 Solo en backend**

- Administra completamente:
  - Cursos: creación, edición y eliminación
  - Mentorías: supervisión y eliminación global
  - Certificaciones: emisión y validación final
- Controla acceso a endpoints y gestiona integridad de datos del sistema

## 🧪 Instalación y Ejecución del Frontend

### 📦 Requisitos Previos

- Node.js 16+ 
- npm o yarn

### 🔧 Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone git@github.com:martindipeco/inquisitorius.git
cd inquisitorius

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

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

---

# ⚙️ BACKEND

## 🧩 Funcionalidades Implementadas

El backend de **Mentora** ofrece múltiples funcionalidades relacionadas con la gestión de cursos, mentorías y certificaciones. Estas están organizadas por módulos RESTful y protegidas por roles definidos (`ADMIN`, `MENTOR`, `USER`).

### 📚 Gestión de Cursos

- Crear, listar, editar y eliminar cursos
- Asignar mentorías a cursos
- Manejar niveles del curso: `INICIAL`, `INTERMEDIO`, `AVANZADO`

### 🤝 Gestión de Mentorías

- Crear mentorías entre usuarios
- Asociar mentor y aprendiz a un curso
- Manejar estados de una mentoría:  
  `EN_CURSO`, `FINALIZADA`, `CANCELADA`

### 🏅 Gestión de Certificaciones

- Registrar certificaciones con nombre, institución y fecha
- Asociar cada certificación a un usuario validado

### 🔐 Seguridad y Control de Accesos

- Registro y autenticación mediante JWT
- Roles definidos para autorización: `ADMIN`, `MENTOR`, `USER`
- Uso de anotaciones `@PreAuthorize` en controladores
- Protección de endpoints según el perfil del usuario

## 🔁 Endpoints REST por Módulo

| Módulo            | Método | Ruta                             | Roles Autorizados   |
|-------------------|--------|----------------------------------|---------------------|
| **Cursos**        | POST   | `/api/cursos`                    | ADMIN               |
|                   | GET    | `/api/cursos`                    | Todos               |
|                   | PUT    | `/api/cursos/{id}`               | ADMIN               |
|                   | DELETE | `/api/cursos/{id}`               | ADMIN               |
| **Mentorías**     | POST   | `/api/mentorias`                 | ADMIN, MENTOR       |
|                   | GET    | `/api/mentorias`                 | Todos               |
|                   | PUT    | `/api/mentorias/{id}`            | ADMIN, MENTOR       |
|                   | DELETE | `/api/mentorias/{id}`            | ADMIN               |
| **Certificaciones** | POST | `/api/certificaciones`           | ADMIN, MENTOR       |
|                   | GET    | `/api/certificaciones`           | Todos               |
|                   | PUT    | `/api/certificaciones/{id}`      | ADMIN, MENTOR       |
|                   | DELETE | `/api/certificaciones/{id}`      | ADMIN               |

### ✅ Acciones Protegidas por Rol

| Módulo          | Roles Autorizados | Acciones Protegidas                |
|-----------------|-------------------|------------------------------------|
| Cursos          | ADMIN             | Crear, editar, eliminar            |
| Mentorías       | ADMIN, MENTOR     | Crear, editar (solo ADMIN elimina)|
| Certificaciones | ADMIN, MENTOR     | Crear, editar (solo ADMIN elimina)|

Cada módulo utiliza:
- **DTOs descriptivos** en español
- **Validaciones semánticas** con `@Valid`

## 🧪 Pruebas del Backend

Se utilizó **Insomnia** para validar los principales flujos de autenticación, autorización y manipulación de entidades. Las pruebas garantizan el correcto funcionamiento de los endpoints protegidos por roles y las validaciones de negocio.

### 🔍 Funcionalidades Probadas

- **Login y registro de usuarios** con generación y validación de tokens JWT  
- **Control de acceso** según rol (respuestas 403 cuando no se tiene permiso)  
- **CRUD de cursos, mentorías y certificaciones**  
- **Asociación entre entidades** (ej. mentor a curso, certificación a usuario)  
- **Manejo de errores comunes**, como:
  - Usuario o curso inexistente  
  - Datos inválidos en solicitudes  
  - Acceso a rutas sin token o con token inválido  

### 📁 Colección Insomnia

La colección completa de pruebas está disponible en el archivo:

`skillslink-insomnia.json`

---

# 🌟 ¿Por qué destaca este proyecto?

**Mentora** no solo propone una solución técnica funcional, sino que se consolida como una plataforma educativa con enfoque humano, modularidad tecnológica y escalabilidad.

## 🏗️ Arquitectura y Código

- Código modular, organizado en componentes frontend y servicios backend.
- Separación clara de responsabilidades: autenticación, datos, servicios, UI.
- Uso de nombres descriptivos y DTOs en español para claridad semántica.
- Controladores RESTful con buenas prácticas de seguridad y validación.

## 📈 Escalabilidad y Mantenimiento

- Diseño preparado para incorporar futuras funciones: notificaciones, foros, contenidos multimedia.
- Uso de tecnologías ampliamente soportadas y bien documentadas.
- Interoperabilidad entre frontend mockeado y backend real.

## 🎓 Enfoque Pedagógico

- Mentores como agentes activos en el proceso formativo.
- Seguimiento del progreso mediante certificaciones y registros.
- Incentivos visuales para mantener la motivación del estudiante.

## 🔐 Seguridad y Control

- Autenticación con JWT.
- Rutas protegidas en frontend y backend según roles (`USER`, `MENTOR`, `ADMIN`).
- Uso de `@PreAuthorize` para control de permisos en los endpoints.
- Validaciones con `@Valid` para asegurar calidad y consistencia de datos.

## 💬 Experiencia de Usuario

- Interfaz clara, amigable y adaptable gracias a TailwindCSS.
- Navegación fluida tipo SPA con rutas protegidas por rol.
- Mensajería interna simulada para fomentar la interacción mentor-estudiante.
- Diseño responsivo, visualmente atractivo y coherente en todo el sistema.
- Sistema de notificaciones Toast para mejor feedback del usuario.
- Componentes animados para una experiencia más dinámica.

---

Este proyecto demuestra cómo la tecnología puede articularse con un enfoque formativo para construir plataformas educativas sólidas, justas y centradas en el aprendizaje significativo.
