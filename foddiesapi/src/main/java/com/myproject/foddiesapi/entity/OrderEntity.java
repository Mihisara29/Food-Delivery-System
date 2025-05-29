package com.myproject.foddiesapi.entity;

import com.myproject.foddiesapi.io.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {
    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private String firstName;
    private String lastName;
    private String city;
    private String district;
    private List<OrderItem> orderedItems;
    private double amount;
    private String stripePaymentId;
    private String paymentStatus;
    private String orderStatus;
}
