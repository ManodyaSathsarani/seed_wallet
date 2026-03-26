package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardDTO {

    private long totalSeeds;
    private long totalUsers;
    private long totalFarmers;
    private long totalOrders;

}