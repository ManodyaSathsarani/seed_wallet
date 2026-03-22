package com.example.demo.repository;

import com.example.demo.entity.Seed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeedRepository extends JpaRepository<Seed, Long> {
    List<Seed> findByFarmerUsername(String farmerUsername);
    void deleteByFarmerUsername(String farmerUsername);
}