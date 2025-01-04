FROM maven:3.8.5-openjdk-17 as build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081

ENV SPRING_PROFILES_ACTIVE=prod
ENV SPRING_DATASOURCE_URL=jdbc:mysql://containers-us-west-45.railway.app:7545/railway?allowPublicKeyRetrieval=true&useSSL=false
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=password

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app.jar"] 