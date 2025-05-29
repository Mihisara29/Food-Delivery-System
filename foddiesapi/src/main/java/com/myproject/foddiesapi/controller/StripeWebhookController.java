package com.myproject.foddiesapi.controller;

import com.myproject.foddiesapi.service.OrderService;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StripeWebhookController {

    private static final Logger logger = LoggerFactory.getLogger(StripeWebhookController.class);

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    private final OrderService orderService;

    public StripeWebhookController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/api/stripe/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        logger.info("Received payload: {}", payload);
        logger.info("Received signature: {}", sigHeader);
        logger.info("Received Stripe webhook event");

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            logger.info("Processing event type: {}", event.getType());

            if ("payment_intent.succeeded".equals(event.getType())) {
                PaymentIntent paymentIntent = (PaymentIntent) event.getDataObjectDeserializer()
                        .getObject()
                        .orElseThrow(() -> new RuntimeException("No payment intent found"));

                logger.info("Payment succeeded for intent: {}", paymentIntent.getId());
                handlePaymentIntentSucceeded(paymentIntent);
            }

            return ResponseEntity.ok("Webhook processed successfully");
        } catch (StripeException e) {
            logger.error("Stripe webhook error", e);
            return ResponseEntity.badRequest().body("Invalid webhook signature");
        } catch (Exception e) {
            logger.error("Unexpected error processing webhook", e);
            return ResponseEntity.internalServerError().body("Error processing webhook");
        }
    }

    private void handlePaymentIntentSucceeded(PaymentIntent paymentIntent) {
        String orderId = paymentIntent.getMetadata().get("order_id");
        if (orderId == null || orderId.isBlank()) {
            logger.error("No order_id found in payment intent metadata");
            throw new IllegalArgumentException("Missing order_id in payment metadata");
        }

        logger.info("Updating order {} with payment intent {}", orderId, paymentIntent.getId());

        Map<String, String> paymentData = new HashMap<>();
        paymentData.put("payment_intent_id", paymentIntent.getId());
        paymentData.put("order_id", orderId);

        try {
            orderService.verifyPayment(paymentData, "paid");
            logger.info("Successfully updated order {} payment status", orderId);
        } catch (Exception e) {
            logger.error("Failed to update order {} payment status", orderId, e);
            throw new RuntimeException("Failed to update order status", e);
        }
    }
}