package com.example.demo.controller;

import com.example.demo.dto.SeedDTO;
import com.example.demo.service.SeedService;
import com.example.demo.util.APIResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/seeds")
@CrossOrigin(origins = "*")
public class SeedController {

    private final SeedService seedService;

    // FARMER — post a new product
    @PostMapping
    public ResponseEntity<APIResponse> addSeeds(
            @RequestBody SeedDTO dto,
            Authentication auth) {

        SeedDTO product = seedService.addSeed(dto, auth.getName());

        return ResponseEntity.ok(
                APIResponse.builder()
                        .status(200)
                        .message("Seeds listed successfully")
                        .data(product)
                        .build()
        );
    }

    // ADMIN + BUYER — browse all products
    @GetMapping
    public ResponseEntity<APIResponse> getAllSeeds() {
        List<SeedDTO> products = seedService.getAllSeeds();

        return ResponseEntity.ok(
                APIResponse.builder()
                        .status(200)
                        .message("Seeds loaded successfully")
                        .data(products)
                        .build()
        );
    }

    // FARMER — view only their own listings
    @GetMapping("/my")
    public ResponseEntity<APIResponse> getMyProducts(Authentication auth) {
        List<SeedDTO> products = seedService.getMySeeds(auth.getName());

        return ResponseEntity.ok(
                APIResponse.builder()
                        .status(200)
                        .message("Your listings loaded successfully")
                        .data(products)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody SeedDTO dto,
            Authentication auth) {
        SeedDTO updated = seedService.updateSeedst(id, dto, auth.getName());
        return ResponseEntity.ok(APIResponse.builder()
                .status(200).message("Seeds updated").data(updated).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse> deleteProduct(
            @PathVariable Long id,
            Authentication auth) {
        seedService.deleteSeed(id, auth.getName());
        return ResponseEntity.ok(
                APIResponse.builder()
                        .status(200)
                        .message("Seeds deleted successfully")
                        .data(null)
                        .build()
        );
    }
}