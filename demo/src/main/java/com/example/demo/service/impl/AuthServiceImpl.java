package com.example.demo.service.impl;

import com.example.demo.dto.AuthDTO;
import com.example.demo.dto.AuthResponseDTO;
import com.example.demo.dto.RegisterDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import com.example.demo.service.AuthService;
import com.example.demo.util.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterDTO dto) {
        if(userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        User user = User.builder()
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();
        userRepository.save(user);
        return jwtService.generateToken(user.getUsername());
    }

    public AuthResponseDTO authenticate(AuthDTO dto) {

        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            String token=jwtService.generateToken(user.getUsername());
            AuthResponseDTO authResponseDTO=new AuthResponseDTO(token,user.getRole());
            return authResponseDTO;

        }
        throw new RuntimeException("Invalid credentials");
    }
}