package com.yourorg.appname.config;

import com.yourorg.appname.security.CustomUserDetailsService;
import com.yourorg.appname.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;
    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(c -> c.configurationSource(corsConfig.corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)) // for h2-console
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public authentication endpoints
                .requestMatchers("/api/auth/**").permitAll()

                // Public read-only café browsing endpoints
                .requestMatchers(HttpMethod.GET, "/api/menu/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/stores/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/offers/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/blogs/**").permitAll()

                // Public user actions (inquiries, subscriptions, booking & orders)
                .requestMatchers(HttpMethod.POST, "/api/contact/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/newsletter/**").permitAll()
                .requestMatchers("/api/giftcards/**").permitAll()
                .requestMatchers("/api/celebrations/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/reservations/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/orders/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/orders", "/api/orders/{orderNumber}").permitAll()

                // H2 console fallback
                .requestMatchers("/h2-console/**").permitAll()

                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
