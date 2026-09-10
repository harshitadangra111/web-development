package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.LoginRequest;
import com.yourorg.appname.dto.request.RegisterRequest;
import com.yourorg.appname.dto.response.AuthResponse;
import com.yourorg.appname.dto.response.UserResponse;
import com.yourorg.appname.entity.Role;
import com.yourorg.appname.entity.User;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.DtoMapper;
import com.yourorg.appname.repository.RoleRepository;
import com.yourorg.appname.repository.UserRepository;
import com.yourorg.appname.security.JwtUtil;
import com.yourorg.appname.security.UserPrincipal;
import com.yourorg.appname.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final DtoMapper mapper;

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = jwtUtil.generateToken(principal);
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(mapper.toUserResponse(user))
                .build();
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with this email already exists: " + request.getEmail());
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_USER").description("Café Patron").build()));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .patronTier("CRESCENT_PATRON")
                .rewardPoints(50) // welcome reward points
                .isActive(true)
                .roles(Set.of(userRole))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);
        UserPrincipal principal = new UserPrincipal(savedUser);
        String token = jwtUtil.generateToken(principal);

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .user(mapper.toUserResponse(savedUser))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return mapper.toUserResponse(user);
    }
}
