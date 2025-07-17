package com.joaosantos.apirestfulv1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    /**
     * Define o BCrypt como o algoritmo para criptografar senhas.
     * Ao ser um @Bean, ele pode ser injetado em outras classes, como o UsuarioController.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configuração principal da segurança da aplicação.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Aplica a configuração de CORS definida no método abaixo.
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Desabilita a proteção CSRF (Cross-Site Request Forgery), comum em APIs stateless.
                .csrf(AbstractHttpConfigurer::disable)

                // Configura as regras de autorização para as requisições HTTP.
                .authorizeHttpRequests(auth ->
                        // ✅ ESTA LINHA PERMITE TODAS AS REQUISIÇÕES TEMPORARIAMENTE ✅
                        // Isso resolve o erro 401 para que você possa desenvolver a página de admin.
                        auth.anyRequest().permitAll()
                );

        return http.build();
    }

    /**
     * Configuração global de CORS.
     * Permite que o frontend (rodando em http://localhost:5173) se comunique com o backend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Define a origem permitida (seu frontend React)
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Define os métodos HTTP permitidos (GET, POST, etc.)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permite todos os cabeçalhos na requisição
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica esta configuração a todas as rotas da sua aplicação ("/**")
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}