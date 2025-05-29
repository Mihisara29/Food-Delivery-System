package com.myproject.foddiesapi.payment;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.PaymentLinkCreateParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeClient {

    @Value("${stripe.secret-key}")
    private String StripeApiKey;


    public String createPaymentLink(Long amount, String currency, String productName, String orderId)
            throws StripeException {

        Stripe.apiKey = StripeApiKey;

        Product product = Product.create(
                ProductCreateParams.builder()
                        .setName(productName)  // Using productName parameter
                        .build()
        );

        Price price = Price.create(
                PriceCreateParams.builder()
                        .setCurrency(currency.toLowerCase())  // Using currency parameter
                        .setUnitAmount(amount)  // Using amount parameter
                        .setProduct(product.getId())
                        .build()
        );

        PaymentLink paymentLink = PaymentLink.create(
                PaymentLinkCreateParams.builder()
                        .addLineItem(
                                PaymentLinkCreateParams.LineItem.builder()
                                        .setPrice(price.getId())
                                        .setQuantity(1L)
                                        .build()
                        )
                        .setAfterCompletion(
                                PaymentLinkCreateParams.AfterCompletion.builder()
                                        .setType(PaymentLinkCreateParams.AfterCompletion.Type.REDIRECT)
                                        .setRedirect(
                                                PaymentLinkCreateParams.AfterCompletion.Redirect.builder()
                                                        .setUrl("http://localhost:5173/status?order_id=" + orderId)  // Using orderId
                                                        .build()
                                        )
                                        .build()
                        )
                        .putMetadata("order_id", orderId)  // Using orderId
                        .build()
        );

        return paymentLink.getUrl();
    }

    public boolean verifyPayment(String paymentIntentId) throws StripeException {
        // Implementation using Stripe API
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return "succeeded".equals(paymentIntent.getStatus());
    }
}

