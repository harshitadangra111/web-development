package com.yourorg.appname.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:${CORS_ALLOWED_ORIGINS:}}")
    private String customAllowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        List<String> allowedPatterns = new ArrayList<>();
        // Local development patterns
        allowedPatterns.add("http://localhost:*");
        allowedPatterns.add("http://127.0.0.1:*");
        // Render cloud domain pattern
        allowedPatterns.add("https://*.onrender.com");

        // Custom domains via CORS_ALLOWED_ORIGINS or cors.allowed-origins
        if (customAllowedOrigins != null && !customAllowedOrigins.isBlank()) {
            String[] origins = customAllowedOrigins.split(",");
            for (String origin : origins) {
                String trimmed = origin.trim();
                if (!trimmed.isEmpty()) {
                    allowedPatterns.add(trimmed);
                }
            }
        }

        configuration.setAllowedOriginPatterns(allowedPatterns);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With", "Origin"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
