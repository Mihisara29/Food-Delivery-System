package com.myproject.foddiesapi.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationFacade {

   Authentication getAuthentication();
}
