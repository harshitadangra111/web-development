package com.yourorg.appname.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;

@Slf4j
@Configuration
@Profile("postgres")
public class DatabaseConfig {

    @Value("${DATABASE_URL:#{null}}")
    private String databaseUrlProperty;

    @Value("${spring.datasource.url:#{null}}")
    private String springDatasourceUrl;

    @Value("${spring.datasource.username:#{null}}")
    private String springDatasourceUsername;

    @Value("${spring.datasource.password:#{null}}")
    private String springDatasourcePassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName("org.postgresql.Driver");

        // Check environment variable first, then property
        String rawDbUrl = System.getenv("DATABASE_URL");
        if (rawDbUrl == null || rawDbUrl.isBlank()) {
            rawDbUrl = databaseUrlProperty;
        }

        if (rawDbUrl != null && !rawDbUrl.isBlank()) {
            log.info("DATABASE_URL detected. Parsing and adapting for PostgreSQL JDBC connection...");
            try {
                if (rawDbUrl.startsWith("jdbc:postgresql:")) {
                    hikariConfig.setJdbcUrl(rawDbUrl);
                    if (springDatasourceUsername != null && !springDatasourceUsername.isBlank()) {
                        hikariConfig.setUsername(springDatasourceUsername);
                    }
                    if (springDatasourcePassword != null && !springDatasourcePassword.isBlank()) {
                        hikariConfig.setPassword(springDatasourcePassword);
                    }
                } else {
                    // Normalize protocol to postgresql:// for URI parsing
                    String normalizedUrl = rawDbUrl;
                    if (normalizedUrl.startsWith("postgres://")) {
                        normalizedUrl = "postgresql://" + normalizedUrl.substring("postgres://".length());
                    }

                    URI dbUri = new URI(normalizedUrl);
                    String host = dbUri.getHost();
                    int port = dbUri.getPort() > 0 ? dbUri.getPort() : 5432;
                    String path = dbUri.getPath();
                    String query = dbUri.getQuery();

                    StringBuilder jdbcUrlBuilder = new StringBuilder("jdbc:postgresql://")
                            .append(host)
                            .append(":")
                            .append(port)
                            .append(path);

                    if (query != null && !query.isBlank()) {
                        jdbcUrlBuilder.append("?").append(query);
                    }

                    String jdbcUrl = jdbcUrlBuilder.toString();
                    hikariConfig.setJdbcUrl(jdbcUrl);
                    log.info("Constructed JDBC URL: jdbc:postgresql://{}:{}{}", host, port, path);

                    // Extract username and password from userInfo
                    if (dbUri.getUserInfo() != null) {
                        String[] userInfo = dbUri.getUserInfo().split(":", 2);
                        hikariConfig.setUsername(userInfo[0]);
                        if (userInfo.length > 1) {
                            hikariConfig.setPassword(userInfo[1]);
                        }
                    }
                }

                // Production pool tuning
                hikariConfig.setMaximumPoolSize(10);
                hikariConfig.setMinimumIdle(2);
                hikariConfig.setIdleTimeout(30000);
                hikariConfig.setConnectionTimeout(20000);
                hikariConfig.setMaxLifetime(1800000);

                log.info("PostgreSQL HikariCP DataSource successfully configured from DATABASE_URL adapter.");
                return new HikariDataSource(hikariConfig);

            } catch (Exception e) {
                log.error("Failed to parse DATABASE_URL ({}). Falling back to standard datasource configuration.", e.getMessage(), e);
            }
        }

        // Fallback: standard spring.datasource.* properties
        log.info("Configuring PostgreSQL HikariCP DataSource from standard spring.datasource properties.");
        hikariConfig.setJdbcUrl(springDatasourceUrl != null ? springDatasourceUrl : "jdbc:postgresql://localhost:5432/luna_latte_db");
        if (springDatasourceUsername != null) {
            hikariConfig.setUsername(springDatasourceUsername);
        }
        if (springDatasourcePassword != null) {
            hikariConfig.setPassword(springDatasourcePassword);
        }

        hikariConfig.setMaximumPoolSize(10);
        hikariConfig.setMinimumIdle(2);
        return new HikariDataSource(hikariConfig);
    }
}