package com.myproject.foddiesapi.service;


import com.myproject.foddiesapi.entity.UserEntity;
import com.myproject.foddiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class AppUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));

        return new User(user.getEmail(),user.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
