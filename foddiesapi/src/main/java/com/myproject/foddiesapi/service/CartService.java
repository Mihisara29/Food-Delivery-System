package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.io.CartRequest;
import com.myproject.foddiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
