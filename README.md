# Inquisitorius - Frontend


**Inquisitorius** es una plataforma educativa desarrollada con **React + TypeScript + Vite** que permite a estudiantes y mentores interactuar en un entorno digital seguro, colaborativo. Este repositorio contiene el **frontend SPA** con integración futura a backend Spring Boot + MySQL/PostgreSQL.

---

## 📌 Características Principales

- 🧠 Autenticación de usuarios (login, registro)
- 🧑‍🏫 Perfiles para estudiantes y mentores
- 🌐 Comunidad con filtrado de habilidades, intereses y ubicación
- 🎯 Participación en desafíos y mentorías
- ✉️ Sistema de mensajería entre usuarios
- 🏆 Visualización gráfica de logros e insignias
- 🧭 SPA (Single Page Application) con navegación fluida

---

## 📁 Estructura del Proyecto

src/
│
├── assets/ # Imágenes y archivos estáticos
│ └── images/
│ └── Imagen2_estudiantes_sinLogin_ppal.jpg
│
├── components/
│ └── common/
│ ├── Header.tsx
│ └── Footer.tsx
│
├── pages/ # Vistas del proyecto
│ ├── Login.tsx
│ ├── Register.tsx
│ ├── Dashboard.tsx
│ ├── Home.tsx
│ ├── Community.tsx
│ ├── Challenges.tsx
│ ├── Messaging.tsx
│ ├── Progress.tsx
│ ├── UserProfile.tsx
│ └── Mentorships.tsx
│
├── routes/ # SPA Routing
│ └── AppRouter.tsx
│
├── styles/
│ └── login.css
│
├── App.tsx
├── main.tsx
└── index.css

---

## 🛠️ Tecnologías Utilizadas

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **React Router**
- **PostCSS + Autoprefixer**
- **Mock JSON para pruebas**

---

### 🔧 Estilo y Layout
- Inputs de login y formularios con diseño más compacto, color blanco, responsivos.
- Botones de envío en color `#00B4D8` con mismo ancho de los inputs.
- Login alineado a la derecha, con imagen de fondo (estudiantes).
- Header con fondo `#006D77` y texto blanco.
- Footer con estilo unificado al Header.

### ✨ Funcionalidades
- Validaciones mejoradas: correos deben contener `@`, contraseñas de 6-12 caracteres.
- Efectos visuales para registros exitosos y cambios de pantalla.
- SPA completamente funcional: rutas sin recarga, navegación rápida.
- Mentorías (lista, creación de mentorías, vista mentor)
- Mensajería (lista chats, mensajes, simulación en tiempo real)
- Progreso (cursos y certificados)
- Dashboard, UserProfile con formularios y modales
- Ya tienes Login, Registro, Home, Comunidad y Mentorías con creación.
- SPA con rutas protegidas y roles.
- Código modular, comentarios implícitos con nombres y estructura clara.
- TailwindCSS para estilos responsivos.
- Simulación con datos mock para futura integración backend.
- Sección de mentorías protegida para rol mentor.

---

## 🔐 Roles de Usuario

### Usuario (Estudiante)
- Inicio personalizado con mensaje motivacional.
- Lista de cursos, inscripciones, progreso y certificaciones.
- Perfil editable.

### Mentor
- Lista de mentorías activas.
- Posibilidad de crear nuevas mentorías desde un formulario especializado.

---

## 🚀 Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/Alejarp78/inquisitorius-frontend.git
cd inquisitorius-frontend

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev


