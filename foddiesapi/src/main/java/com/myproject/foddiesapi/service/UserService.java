package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.io.UserRequest;
import com.myproject.foddiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);
    String findByUserId();
}
