FROM openjdk:21-jdk-slim
ARG JAR_FILE=target/matriz-backend-0.0.1.jar
COPY ${JAR_FILE} app_matrizlegal.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app_matrizlegal.jar"]