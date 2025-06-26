FROM openjdk:17-jdk-slim

COPY target/skillslink-0.0.1-SNAPSHOT.jar skillslink.jar

EXPOSE 3000

ENTRYPOINT ["java", "-jar", "/skillslink.jar"]
