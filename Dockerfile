FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app

COPY . .

# Permisos de ejecución
RUN chmod +x mvnw

# Package de la App
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

# Copiar el contenido de la carpeta target al docker
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
