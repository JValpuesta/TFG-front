FROM openjdk:17-jdk-slim
COPY target/conecta4-0.0.1-SNAPSHOT.jar /app/conecta4.jar
WORKDIR /app
EXPOSE 9023
CMD ["java", "-jar", "conecta4.jar"]