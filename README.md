# Inquisitorius – Plataforma de Mentoría y Certificación

**Inquisitorius** es una plataforma educativa integral que conecta estudiantes y mentores mediante un entorno digital seguro y colaborativo. El sistema está dividido en dos partes:

- **Frontend SPA** desarrollado con **React + TypeScript + Vite**, enfocado en la experiencia del usuario.
- **Backend** desarrollado con **Java + Spring Boot**, orientado a la gestión académica, mentorías y certificaciones.

Este repositorio busca fomentar el aprendizaje significativo, la trazabilidad del progreso y el reconocimiento de habilidades mediante mentorías guiadas y certificaciones verificadas.

---

## 📌 Características Principales

- 🧠 Autenticación y autorización con JWT
- 🧑‍🏫 Perfiles diferenciados para estudiantes y mentores
- 🌐 Comunidad con filtrado de habilidades, intereses y ubicación
- 🎯 Participación en desafíos, cursos y mentorías
- ✉️ Sistema de mensajería entre usuarios en tiempo real
- 🏆 Visualización de logros e insignias
- 📚 Gestión de cursos y niveles de dificultad
- 🏅 Registro y validación de certificaciones académicas
- 🔒 Rutas protegidas y control de acceso por roles (`ADMIN`, `MENTOR`, `USER`)
- 🧭 SPA (Single Page Application) con navegación fluida y sin recarga

---

## 🛠️ Tecnologías Utilizadas

### 🔷 Frontend

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **React Router**
- **PostCSS + Autoprefixer**
- **Mock JSON para pruebas**

### 🔷 Backend

- **Java 17+**
- **Spring Boot**
- **Spring Security + JWT**
- **MySQL**
- **Maven**
- **JPA / Hibernate**
- **Insomnia para pruebas REST**

---

## 📁 Estructura del Proyecto (Frontend)

```plaintext
src/
│
├── assets/               # Imágenes y archivos estáticos
│   └── images/
│       └── Imagen2_estudiantes_sinLogin_ppal.jpg
│
├── components/           # Componentes reutilizables
│   └── common/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── pages/                # Vistas principales
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   ├── Community.tsx
│   ├── Challenges.tsx
│   ├── Messaging.tsx
│   ├── Progress.tsx
│   ├── UserProfile.tsx
│   └── Mentorships.tsx
│
├── routes/               # Enrutamiento SPA
│   └── AppRouter.tsx
│
├── styles/               # Estilos personalizados
│   └── login.css
│
├── App.tsx
├── main.tsx
└── index.css
```
---

## 🎨 Estilo y Diseño (Frontend)

El diseño de Inquisitorius está pensado para ser limpio, accesible y responsivo, adaptado tanto para estudiantes como mentores.

### 🔧 Estilo y Layout

- Inputs de login y formularios con diseño compacto, color blanco y responsividad.
- Botones de envío con color primario `#00B4D8` y mismo ancho que los campos de entrada.
- Página de login alineada a la derecha, con imagen de fondo de estudiantes.
- Header con fondo en color `#006D77` y texto blanco.
- Footer con un diseño coherente al del header para mantener armonía visual.

---

## ✨ Funcionalidades Visuales del Frontend

- **Validaciones** en formularios:
  - Correos deben contener `@`
  - Contraseñas deben tener entre 6 y 12 caracteres
- **Efectos visuales** para:
  - Transiciones de pantalla
  - Confirmación de registro exitoso
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

---

## 🔐 Roles de Usuario

Inquisitorius implementa un sistema de control de acceso basado en roles para ofrecer experiencias diferenciadas según el tipo de usuario. Los roles definidos son:

- `USER` (Estudiante)
- `MENTOR`
- `ADMIN` (solo en backend)

---

### 👨‍🎓 Usuario (Estudiante)

- Accede a un **inicio personalizado** con mensaje motivacional
- Consulta la **lista de cursos disponibles**
- Se inscribe y visualiza su **progreso** en cursos y mentorías
- Accede a sus **certificaciones obtenidas**
- Puede **editar su perfil personal**
- Participa en la **comunidad**, interactúa en desafíos y utiliza el sistema de **mensajería interna**

---

### 🧑‍🏫 Mentor

- Visualiza su lista de **mentorías activas**
- Puede **crear nuevas mentorías** a través de un formulario especializado
- Administra mentorías asociadas a cursos
- Tiene acceso al sistema de **mensajería interna**
- Puede validar avances de aprendices y contribuir con certificaciones

---

### 👑 Admin (solo backend)

- Administra completamente:
  - Cursos: creación, edición y eliminación
  - Mentorías: supervisión y eliminación global
  - Certificaciones: emisión y validación final
- Controla acceso a endpoints y gestiona integridad de datos del sistema

---

## 🚀 Instalación y Ejecución del Proyecto (Frontend)

Sigue los siguientes pasos para correr la aplicación en modo de desarrollo:

### 🔽 1. Clonar el repositorio

# Clona el repositorio
git clone git@github.com:martindipeco/inquisitorius.git
cd inquisitorius-feat/vista-registro

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev

---

## 🧩 Funcionalidades Implementadas en el Backend

El backend de **Mentora** ofrece múltiples funcionalidades relacionadas con la gestión de cursos, mentorías y certificaciones. Estas están organizadas por módulos RESTful y protegidas por roles definidos (`ADMIN`, `MENTOR`, `USER`).

---

### 📚 Cursos

- Crear, listar, editar y eliminar cursos
- Asignar mentorías a cursos
- Manejar niveles del curso: `INICIAL`, `INTERMEDIO`, `AVANZADO`

---

### 🤝 Mentorías

- Crear mentorías entre usuarios
- Asociar mentor y aprendiz a un curso
- Manejar estados de una mentoría:  
  `EN_CURSO`, `FINALIZADA`, `CANCELADA`

---

### 🏅 Certificaciones

- Registrar certificaciones con nombre, institución y fecha
- Asociar cada certificación a un usuario validado

---

### 🔐 Seguridad y Control de Accesos

- Registro y autenticación mediante JWT
- Roles definidos para autorización: `ADMIN`, `MENTOR`, `USER`
- Uso de anotaciones `@PreAuthorize` en controladores
- Protección de endpoints según el perfil del usuario

---

### 🌐 Endpoints REST por Módulo

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

---

### ✅ Acciones Protegidas por Rol

| Módulo          | Roles Autorizados | Acciones Protegidas                |
|-----------------|-------------------|------------------------------------|
| Cursos          | ADMIN             | Crear, editar, eliminar            |
| Mentorías       | ADMIN, MENTOR     | Crear, editar (solo ADMIN elimina)|
| Certificaciones | ADMIN, MENTOR     | Crear, editar (solo ADMIN elimina)|

---

Cada módulo utiliza:
- **DTOs descriptivos** en español
- **Validaciones semánticas** con `@Valid`

---

## 🧪 Pruebas del Backend con Insomnia

Se utilizó **Insomnia** para validar los principales flujos de autenticación, autorización y manipulación de entidades. Las pruebas garantizan el correcto funcionamiento de los endpoints protegidos por roles y las validaciones de negocio.

---

### 🔍 Funcionalidades Probadas

- **Login y registro de usuarios** con generación y validación de tokens JWT  
- **Control de acceso** según rol (respuestas 403 cuando no se tiene permiso)  
- **CRUD de cursos, mentorías y certificaciones**  
- **Asociación entre entidades** (ej. mentor a curso, certificación a usuario)  
- **Manejo de errores comunes**, como:
  - Usuario o curso inexistente  
  - Datos inválidos en solicitudes  
  - Acceso a rutas sin token o con token inválido  

---

### 📎 Colección Insomnia

La colección completa de pruebas está disponible en el archivo:

```text
skillslink-insomnia.json

---

## 🔮 ¿Por qué destaca este proyecto?

**Inquisitorius** no solo propone una solución técnica funcional, sino que se consolida como una plataforma educativa con enfoque humano, modularidad tecnológica y escalabilidad.

---

### 🧱 Arquitectura y Código

- Código modular, organizado en componentes frontend y servicios backend.
- Separación clara de responsabilidades: autenticación, datos, servicios, UI.
- Uso de nombres descriptivos y DTOs en español para claridad semántica.
- Controladores RESTful con buenas prácticas de seguridad y validación.

---

### 📈 Escalabilidad y Mantenimiento

- Diseño preparado para incorporar futuras funciones: notificaciones, foros, contenidos multimedia.
- Uso de tecnologías ampliamente soportadas y bien documentadas.
- Interoperabilidad entre frontend mockeado y backend real.

---

### 🎓 Enfoque Pedagógico

- Mentores como agentes activos en el proceso formativo.
- Seguimiento del progreso mediante certificaciones y registros.
- Incentivos visuales para mantener la motivación del estudiante.

---

### 🔐 Seguridad y Control

- Autenticación con JWT.
- Rutas protegidas en frontend y backend según roles (`USER`, `MENTOR`, `ADMIN`).
- Uso de `@PreAuthorize` para control de permisos en los endpoints.
- Validaciones con `@Valid` para asegurar calidad y consistencia de datos.

---

### 💬 Experiencia de Usuario

- Interfaz clara, amigable y adaptable gracias a TailwindCSS.
- Navegación fluida tipo SPA con rutas protegidas por rol.
- Mensajería interna simulada para fomentar la interacción mentor-estudiante.
- Diseño responsivo, visualmente atractivo y coherente en todo el sistema.

---

Este proyecto demuestra cómo la tecnología puede articularse con un enfoque formativo para construir plataformas educativas sólidas, justas y centradas en el aprendizaje significativo.

---
