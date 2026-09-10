package com.yourorg.appname.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L);
    }

    @Test
    void testGenerateAndValidateToken() {
        UserDetails userDetails = new User("patron@luna.com", "password",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        String token = jwtUtil.generateToken(userDetails);
        assertNotNull(token);
        assertFalse(token.isEmpty());

        String username = jwtUtil.extractUsername(token);
        assertEquals("patron@luna.com", username);

        Boolean isValid = jwtUtil.validateToken(token, userDetails);
        assertTrue(isValid);

        Date expiration = jwtUtil.extractExpiration(token);
        assertTrue(expiration.after(new Date()));
    }

    @Test
    void testValidateTokenWithDifferentUser() {
        UserDetails user1 = new User("user1@luna.com", "pass", Collections.emptyList());
        UserDetails user2 = new User("user2@luna.com", "pass", Collections.emptyList());

        String token = jwtUtil.generateToken(user1);
        Boolean isValid = jwtUtil.validateToken(token, user2);
        assertFalse(isValid);
    }
}
