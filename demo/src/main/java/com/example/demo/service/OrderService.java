package com.example.demo.service;



import com.example.demo.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO placeOrder(OrderDTO dto, String buyerUsername);
    List<OrderDTO> getMyOrders(String buyerUsername);
    List<OrderDTO> getOrdersByFarmer(String farmerUsername);
}