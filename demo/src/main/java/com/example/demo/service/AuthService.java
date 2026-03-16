package com.example.demo.service;

import com.example.demo.dto.AuthDTO;
import com.example.demo.dto.AuthResponseDTO;
import com.example.demo.dto.RegisterDTO;

public interface AuthService {
    String register(RegisterDTO registerDTO);
    AuthResponseDTO authenticate(AuthDTO authDTO);
}
