package com.example.demo.service.impl;

import com.example.demo.dto.SeedDTO;
import com.example.demo.entity.Seed;
import com.example.demo.repository.SeedRepository;
import com.example.demo.service.SeedService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeedServiceImpl implements SeedService {

    private final SeedRepository seedRepository;
    private final ModelMapper modelMapper;
    @Override
    public SeedDTO addSeed(SeedDTO dto, String farmerUsername) {
        Seed seed = modelMapper.map(dto, Seed.class);
        seed.setFarmerUsername(farmerUsername);
        seed.setCreatedAt(LocalDateTime.now());

        Seed saved = seedRepository.save(seed);

        return modelMapper.map(saved, SeedDTO.class);
    }

    @Override
    public List<SeedDTO> getAllSeeds() {
        return seedRepository.findAll()
                .stream()
                .map(p -> modelMapper.map(p, SeedDTO.class))
                .toList();
    }

    @Override
    public List<SeedDTO> getMySeeds(String farmerUsername) {
        return seedRepository.findByFarmerUsername(farmerUsername)
                .stream()
                .map(p -> modelMapper.map(p, SeedDTO.class))
                .toList();
    }

    @Override
    public SeedDTO updateSeedst(Long id, SeedDTO dto, String farmerUsername) {
        Seed seed = seedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seed not found"));
        if (!seed.getFarmerUsername().equals(farmerUsername))
            throw new RuntimeException("Not your Seed");
        seed.setName(dto.getName());
        seed.setCategory(dto.getCategory());
        seed.setPrice(dto.getPrice());
        seed.setQuantity(dto.getQuantity());
        seed.setDescription(dto.getDescription());
        return modelMapper.map(seedRepository.save(seed), SeedDTO.class);
    }

    @Override
    public void deleteSeed(Long id, String farmerUsername) {
        Seed seed = seedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seed not found"));

        if (!seed.getFarmerUsername().equals(farmerUsername)) {
            throw new RuntimeException("You can only delete your own Seeds");
        }

        seedRepository.delete(seed);
    }
    }
