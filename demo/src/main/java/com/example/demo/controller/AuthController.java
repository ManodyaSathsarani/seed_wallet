package com.example.demo.controller;

import com.example.demo.dto.AuthDTO;
import com.example.demo.dto.AuthResponseDTO;
import com.example.demo.dto.RegisterDTO;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.impl.AuthServiceImpl;
import com.example.demo.util.APIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthServiceImpl authServiceImpl;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<APIResponse> register(@RequestBody RegisterDTO registerDTO) {
        String token = authServiceImpl.register(registerDTO);
        return ResponseEntity.ok(
                APIResponse.builder()
                        .status(201)
                        .message("User Registered")
                        .data(AuthResponseDTO.builder().token(token).build())
                        .build()
        );
    }

    @PostMapping("/signin")
    public ResponseEntity<APIResponse> signIn(@RequestBody AuthDTO authDTO) {
        AuthResponseDTO token = authServiceImpl.authenticate(authDTO);
        return ResponseEntity.ok(
                APIResponse.builder()
                        .status(200)
                        .message("Login Successful")
                        .data(AuthResponseDTO.builder().token(token.getToken()).role(token.getRole()).build())
                        .build()
        );
    }
}