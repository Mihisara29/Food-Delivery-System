package com.myproject.foddiesapi.controller;
import com.myproject.foddiesapi.io.AuthenticationRequest;
import com.myproject.foddiesapi.io.AuthenticationResponse;
import com.myproject.foddiesapi.service.AppUserDetailService;
import com.myproject.foddiesapi.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {

   private final AuthenticationManager authenticationManager;
   private final AppUserDetailService userDetailService;
   private final JwtUtil jwtUtil;

   @PostMapping("/login")
   public AuthenticationResponse login(@RequestBody AuthenticationRequest request){
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
      final UserDetails userDetails = userDetailService.loadUserByUsername(request.getEmail());
      System.out.println("Authorities during login: " + userDetails.getAuthorities());
      final String jwtToken = jwtUtil.generateToken(userDetails);
      return new AuthenticationResponse(request.getEmail(),jwtToken);
   }


}
