package com.example.demo.service;



import com.example.demo.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    void deleteUser(Long id, String currentUsername);

}