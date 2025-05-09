package com.myproject.foddiesapi.service;

import com.myproject.foddiesapi.entity.UserEntity;
import com.myproject.foddiesapi.io.UserRequest;
import com.myproject.foddiesapi.io.UserResponse;
import com.myproject.foddiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;

    @Override
    public String findByUserId(){
        String loggedInUserEmail = authenticationFacade.getAuthentication().getName();
        UserEntity loggedUser = userRepository.findByEmail(loggedInUserEmail).orElseThrow(() -> new UsernameNotFoundException("User is not found"));
        return loggedUser.getId();
    }
    @Override
    public UserResponse registerUser(UserRequest request) {
             UserEntity newUser = convertToEntity(request);
             newUser = userRepository.save(newUser);
            return convertToResponse(newUser);
    }

    private UserEntity convertToEntity(UserRequest request){
         return UserEntity.builder()
                 .email(request.getEmail())
                 .password(passwordEncoder.encode(request.getPassword()))
                 .name(request.getName())
                 .build();
    }

    private UserResponse convertToResponse(UserEntity registeredUser){
        return   UserResponse.builder()
                .id(registeredUser.getId())
                .name(registeredUser.getName())
                .email(registeredUser.getEmail())
                .build();
    }

}
