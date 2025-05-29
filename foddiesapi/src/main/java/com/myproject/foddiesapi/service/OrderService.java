package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.io.OrderRequest;
import com.myproject.foddiesapi.io.OrderResponse;

import java.util.List;
import java.util.Map;

public interface OrderService {
    OrderResponse createOrderWithPayments(OrderRequest request);
    void verifyPayment(Map<String, String> paymentData, String status);
    List<OrderResponse> getUserOrders();
    void removeOrder(String orderId);
    List<OrderResponse> getOrdersOfAllUsers();
    void updateOrderStatus(String orderId, String status);

    OrderResponse getOrderById(String orderId);
}