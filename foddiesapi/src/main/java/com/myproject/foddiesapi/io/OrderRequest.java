package com.myproject.foddiesapi.io;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderRequest {


    private String userAddress;
    private String phoneNumber;
    private String email;
    private String firstName;
    private String lastName;
    private String city;
    private String district;
    private List<OrderItem> orderedItems;
    private double amount;
    private String paymentStatus;

}
