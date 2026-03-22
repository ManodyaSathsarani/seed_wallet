package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyerUsername(String buyerUsername);
    @Query("SELECT o FROM Order o JOIN o.items i WHERE i.farmerUsername = :farmerUsername")
    List<Order> findOrdersByFarmerUsername(@Param("farmerUsername") String farmerUsername);
}