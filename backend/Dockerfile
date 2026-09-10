# =====================================================================
# Luna & Latte Backend API - Multi-Stage Dockerfile (Backend Context)
# =====================================================================

# Stage 1: Build
FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /build

# Copy Maven wrapper and POM
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Pre-fetch dependencies (optimized layer caching)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B || true

# Copy source code and build artifact
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Production Non-Root Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Create unprivileged non-root system group and user
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup --no-create-home appuser

# Copy executable jar from builder stage
COPY --from=builder --chown=appuser:appgroup /build/target/*.jar /app/app.jar

USER appuser

ENV PORT=8080 \
    SPRING_PROFILES_ACTIVE=postgres \
    JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]