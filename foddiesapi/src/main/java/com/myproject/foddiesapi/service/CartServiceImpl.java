package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.entity.CartEntity;
import com.myproject.foddiesapi.io.CartRequest;
import com.myproject.foddiesapi.io.CartResponse;
import com.myproject.foddiesapi.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
        String foodId = request.getFoodId();
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cart  = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId,new HashMap<>()));
        Map<String,Integer> cartItems = cart.getItems();
        cartItems.put(foodId,cartItems.getOrDefault(foodId,0) + 1);
        cart.setItems(cartItems);
        cart = cartRepository.save(cart);
        return convertToResponse(cart);
    }

    private CartResponse convertToResponse(CartEntity cartEntity) {
         return CartResponse.builder()
                 .id(cartEntity.getId())
                 .userId(cartEntity.getUserId())
                 .items(cartEntity.getItems())
                 .build();
    }

    @Override
    public CartResponse getCart(){
        String loggedInUserId = userService.findByUserId();
        CartEntity entity = cartRepository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(null,loggedInUserId,new HashMap<>()));
                return convertToResponse(entity);
    }

    public void clearCart(){
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String loggedInUserId = userService.findByUserId();
        CartEntity entity =cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not found"));
        Map<String,Integer> cartItems = entity.getItems();
        if(cartItems.containsKey(cartRequest.getFoodId())){
            int currentQty = cartItems.get(cartRequest.getFoodId());
            if(currentQty > 0){
                cartItems.put(cartRequest.getFoodId(),currentQty-1);
            }else{
                cartItems.remove(cartRequest.getFoodId());
            }
            entity = cartRepository.save(entity);
        }
        return convertToResponse(entity);
    }


}
