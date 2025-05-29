package com.myproject.foddiesapi.config;
import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    @Value("${stripe.secret-key}")
    private String StripeApiKey;

    @PostConstruct
    public void setup() {
        Stripe.apiKey = StripeApiKey;
    }
}