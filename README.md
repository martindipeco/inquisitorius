 

# Plataforma de Mentoría y Certificaciones – **Mentora**

**Mentora** es una plataforma web que impulsa el crecimiento académico y personal a través de **cursos**, **mentorías personalizadas** y **certificaciones verificadas**. Desarrollada en **Java con Spring Boot**, está orientada a facilitar la conexión entre aprendices y mentores, estructurar procesos formativos y reconocer habilidades adquiridas.

---

## 🧠 Visión del Proyecto

Diseñar un sistema **accesible**, **seguro** y **escalable**, pensado para fomentar:

- El acceso a contenidos formativos mediante cursos  
- La gestión de procesos de mentoría individualizados  
- La emisión de certificaciones validadas por mentores o administradores  

Este backend constituye el **MVP (Producto Mínimo Viable)** de una plataforma comunitaria enfocada en la **colaboración**, la **trazabilidad del aprendizaje** y la **motivación continua**.

---

## 💡 Enfoque de Desarrollo

Desarrollo backend con foco en:

- Educación y mentoría como motores de transformación  
- Accesibilidad y estructura semántica clara  
- Integración de tecnología y cultura para potenciar el aprendizaje significativo

---

## 🔧 Tecnologías utilizadas

- Java 17+  
- Spring Boot  
- Spring Security + JWT  
- MySQL  
- Maven  
- JPA / Hibernate  
- Insomnia para pruebas

---

## 🧩 Funcionalidades Implementadas

### 📚 Cursos
- Crear, listar, editar y eliminar cursos  
- Asignar mentorías a cursos  
- Manejar niveles del curso: `INICIAL`, `INTERMEDIO`, `AVANZADO`

### 🤝 Mentorías
- Crear mentorías entre usuarios  
- Asociar mentor y aprendiz a un curso  
- Manejar estados como `EN_CURSO`, `FINALIZADA`, `CANCELADA`

### 🏅 Certificaciones
- Registrar certificaciones con nombre, institución y fecha  
- Asociar a un usuario validado

---

## 🔐 Seguridad y Accesos

- Registro y login con JWT  
- Roles definidos: `ADMIN`, `MENTOR`, `USER`  
- Control de acceso con `@PreAuthorize`  
- Protección de endpoints por perfil de usuario

🌐 Endpoints REST

| Módulo          | Método  | Ruta                            | Roles autorizados     |
|-----------------|---------|----------------------------------|------------------------|
| **Cursos**      | POST    | `/api/cursos`                   | ADMIN                 |
|                 | GET     | `/api/cursos`                   | Todos los roles       |
|                 | PUT     | `/api/cursos/{id}`              | ADMIN                 |
|                 | DELETE  | `/api/cursos/{id}`              | ADMIN                 |
| **Mentorías**   | POST    | `/api/mentorias`                | ADMIN, MENTOR         |
|                 | GET     | `/api/mentorias`                | Todos los roles       |
|                 | PUT     | `/api/mentorias/{id}`           | ADMIN, MENTOR         |
|                 | DELETE  | `/api/mentorias/{id}`           | ADMIN                 |
| **Certificaciones** | POST    | `/api/certificaciones`           | ADMIN, MENTOR         |
|                 | GET     | `/api/certificaciones`          | Todos los roles       |
|                 | PUT     | `/api/certificaciones/{id}`     | ADMIN, MENTOR         |
|                 | DELETE  | `/api/certificaciones/{id}`     | ADMIN                 |



✅ Acciones Protegidas por Rol
| Módulo          | Roles autorizados | Acciones protegidas                    |
|-----------------|-------------------|----------------------------------------|
| Cursos          | ADMIN             | Crear, editar, eliminar                |
| Mentorías       | ADMIN, MENTOR     | Crear, editar (solo ADMIN elimina)     |
| Certificaciones | ADMIN, MENTOR     | Crear, editar (solo ADMIN elimina)     |

Cada módulo utiliza DTOs descriptivos en castellano y validaciones semánticas con @Valid.

## 🧪 Pruebas con Insomnia

Se testearon funcionalidades clave mediante una colección personalizada:

- Autenticación y generación de JWT  
- Validación de roles y protección de endpoints (`403 Forbidden`)  
- Creación, lectura, actualización y eliminación de entidades  
- Casos de error: usuario/curso inexistente, datos inválidos  

📎 **Colección disponible en:** `skillslink-insomnia.json`

---

## 🔮 ¿Por qué destaca este proyecto?

- Código **modular, limpio y fácilmente mantenible**  
- Arquitectura pensada para **escalabilidad y expansión**  
- Enfoque pedagógico que resalta la **mentoría y la certificación** como motores de crecimiento humano y profesional

