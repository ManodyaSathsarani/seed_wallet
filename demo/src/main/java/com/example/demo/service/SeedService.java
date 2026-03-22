package com.example.demo.service;


import com.example.demo.dto.SeedDTO;

import java.util.List;

public interface SeedService {
    SeedDTO addSeed(SeedDTO dto, String farmerUsername);
    List<SeedDTO> getAllSeeds();
    List<SeedDTO> getMySeeds(String farmerUsername);
    SeedDTO updateSeedst(Long id, SeedDTO dto, String farmerUsername);
    void deleteSeed(Long id, String farmerUsername);
}