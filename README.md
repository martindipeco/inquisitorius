# 🚀 Pasos para Iniciar el Servidor - API SkillsLink

## 📋 Requisitos Previos

### Software Necesario
- **Java 17** (JDK)
- **Maven 3.6+**
- **MySQL 8.0+**
- **IntelliJ IDEA** (recomendado)

### Verificar Instalaciones
```bash
java -version    # Debe mostrar Java 17
mvn -version     # Debe mostrar Maven 3.6+
mysql --version  # Debe mostrar MySQL 8.0+
```

## 🗄️ Configuración de Base de Datos

### 1. Iniciar MySQL
```bash
# En Windows (si está instalado como servicio)
net start mysql

# En macOS con Homebrew
brew services start mysql

# En Linux
sudo systemctl start mysql
```

### 2. Crear Usuario y Base de Datos (Opcional)
```sql
-- Conectarse a MySQL como administrador
mysql -u root -p

-- La base de datos se creará automáticamente por la configuración
-- spring.datasource.url=...?createDatabaseIfNotExist=true
```

## ⚙️ Configuración de Variables de Entorno

### Opción 1: Variables de Sistema
```bash
# Windows (CMD)
set DB_PASSWORD=root
set JWT_SECRET=123456

# Windows (PowerShell)
$env:DB_PASSWORD="root"
$env:JWT_SECRET="123456"

# macOS/Linux
export DB_PASSWORD=root
export JWT_SECRET=123456
```

### Opción 2: Configuración en IntelliJ IDEA
1. Abrir **Run/Debug Configurations**
2. Seleccionar la configuración de **SkillslinkApplication**
3. En **Environment Variables** agregar:
   - `DB_PASSWORD=root`
   - `JWT_SECRET=123456`

## 📦 Instalación y Ejecución

### 1. Clonar y Acceder al Proyecto
```bash
git clone [URL_DEL_REPOSITORIO]
cd skillslink-api
```

### 2. Instalar Dependencias
```bash
mvn clean install
```

### 3. Ejecutar la Aplicación

#### Opción A: Desde IntelliJ IDEA
1. Abrir el proyecto en **IntelliJ IDEA**
2. Localizar `SkillslinkApplication.java`
3. Click derecho → **Run 'SkillslinkApplication'**

#### Opción B: Desde Terminal
```bash
# Ejecutar directamente con Maven
mvn spring-boot:run

# O compilar y ejecutar el JAR
mvn clean package
java -jar target/skillslink-[VERSION].jar
```

## ✅ Verificación

### El servidor debería iniciar exitosamente y mostrar:
```
Started SkillslinkApplication in X.XXX seconds (JVM running for X.XXX)
```

### Verificar que la aplicación esté corriendo:
- **URL Base**: `http://localhost:3000`
- **Puerto**: 3000
- **Base de Datos**: `skilllink_db` (se crea automáticamente)

### Endpoints de Prueba
```bash
# Verificar que el servidor responda
curl http://localhost:3000

# O abrir en el navegador
http://localhost:3000
```

## 🔧 Troubleshooting

### Problemas Comunes

#### Error de Conexión a MySQL
```
Error: Cannot load driver class: com.mysql.cj.jdbc.Driver
```
**Solución**: Verificar que MySQL esté corriendo y las credenciales sean correctas.

#### Puerto 3000 en Uso
```
Error: Port 3000 is already in use
```
**Solución**: Cambiar el puerto en `application.properties` o terminar el proceso que usa el puerto.

#### Variables de Entorno No Encontradas
```
Error: Could not resolve placeholder 'DB_PASSWORD'
```
**Solución**: Verificar que las variables de entorno estén configuradas correctamente.

## 📁 Estructura del Proyecto
```
skillslink-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/.../SkillslinkApplication.java
│   │   └── resources/
│   │       └── application.properties
├── target/
├── pom.xml
└── README.md
```

## 📝 Notas Adicionales

- La aplicación usa **Spring Boot 3.3.0** con **Java 17**
- Hibernate está configurado en modo `update` (creará/actualizará tablas automáticamente)
- Los logs SQL están habilitados para debugging
- El servidor corre en el puerto **3000** (no el 8080 por defecto)

---

¿Necesitas ayuda con algún paso específico? ¡No dudes en preguntar! 🤝
