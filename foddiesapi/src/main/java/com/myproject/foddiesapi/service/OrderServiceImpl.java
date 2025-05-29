package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.entity.OrderEntity;
import com.myproject.foddiesapi.io.OrderRequest;
import com.myproject.foddiesapi.io.OrderResponse;
import com.myproject.foddiesapi.payment.StripeClient;
import com.myproject.foddiesapi.repository.CartRepository;
import com.myproject.foddiesapi.repository.OrderRepository;
import com.stripe.exception.StripeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserService userService;
    private final StripeClient stripeClient;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository,
                            UserService userService,
                            StripeClient stripeClient) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userService = userService;
        this.stripeClient = stripeClient;
    }

    @Override
    @Transactional
    public OrderResponse createOrderWithPayments(OrderRequest request) {
        String userId = userService.findByUserId();
        OrderEntity order = convertToEntity(request);
        order.setUserId(userId);
        order.setOrderStatus("pending");
        order.setPaymentStatus("pending");
        order = orderRepository.save(order);

        try {
            // Create Stripe payment link
            String paymentUrl = stripeClient.createPaymentLink(
                    (long) (order.getAmount() * 100),  // amount (converted to cents)
                    "LKR",                             // currency
                    "Order #" + order.getId(),         // productName
                    order.getId().toString()           // orderId
            );

            OrderResponse response = convertToResponse(order);
            response.setPaymentUrl(paymentUrl);
            return response;
        } catch (StripeException e) {
            logger.error("Stripe payment link creation failed for order {}", order.getId(), e);
            throw new RuntimeException("Failed to create payment link", e);
        }
    }

    @Override
    @Transactional
    public void verifyPayment(Map<String, String> paymentData, String status) {
        // Input validation
        if (paymentData == null || status == null) {
            throw new IllegalArgumentException("Payment data and status cannot be null");
        }

        String paymentIntentId = paymentData.get("payment_intent_id");
        String orderId = paymentData.get("order_id");

        logger.info("Verifying payment for order {} with intent {}", orderId, paymentIntentId);

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> {
                    logger.error("Order not found: {}", orderId);
                    return new RuntimeException("Order not found: " + orderId);
                });

        if ("paid".equalsIgnoreCase(status)) {
            try {
                // Skip verification if we trust webhook events
                order.setPaymentStatus("paid");
                order.setStripePaymentId(paymentIntentId);

                logger.info("Order {} marked as paid with Stripe ID {}", orderId, paymentIntentId);
            } catch (Exception e) {
                logger.error("Failed to process payment for order {}", orderId, e);
                order.setPaymentStatus("verification_failed");
                throw new RuntimeException("Payment processing failed", e);
            }
        }

        orderRepository.save(order);
        logger.info("Order {} status updated to {}", orderId, status);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders() {
        String loggedInUserId = userService.findByUserId();
        return orderRepository.findByUserId(loggedInUserId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void removeOrder(String orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order not found: " + orderId);
        }
        orderRepository.deleteById(orderId);
        logger.info("Order {} deleted successfully", orderId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersOfAllUsers() {
        return orderRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateOrderStatus(String orderId, String status) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        order.setOrderStatus(status);
        orderRepository.save(order);
        logger.info("Order {} status updated to {}", orderId, status);
    }

    @Override
    public OrderResponse getOrderById(String orderId) {

        String currentUserId = userService.findByUserId();

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        if (!order.getUserId().equals(currentUserId)) {  // <- THIS IS FAILING
            throw new RuntimeException("Permission denied");
        }
        System.out.println("[DEBUG] Current user ID: " + currentUserId);
        System.out.println("[DEBUG] Order user ID: " + order.getUserId());
        return convertToResponse(order);
    }


    private OrderEntity convertToEntity(OrderRequest request) {
        return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .city(request.getCity())
                .district(request.getDistrict())
                .amount(request.getAmount())
                .orderedItems(request.getOrderedItems())
                .orderStatus("pending")
                .paymentStatus("pending")
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity entity) {
        return OrderResponse.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .amount(entity.getAmount())
                .userAddress(entity.getUserAddress())
                .phoneNumber(entity.getPhoneNumber())
                .email(entity.getEmail())
                .orderedItems(entity.getOrderedItems())
                .paymentStatus(entity.getPaymentStatus())
                .orderStatus(entity.getOrderStatus())
                .stripePaymentId(entity.getStripePaymentId())
                .build();
    }
}