package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.LoginRequest;
import com.yourorg.appname.dto.request.RegisterRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.AuthResponse;
import com.yourorg.appname.dto.response.UserResponse;
import com.yourorg.appname.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Welcome back to Luna & Latte", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Your patron account has been created", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthorized"));
        }
        UserResponse user = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("User profile fetched", user));
    }
}
