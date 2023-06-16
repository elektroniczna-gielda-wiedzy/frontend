import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (
  route,
  state,
  tokenService = inject(TokenService),
  authService = inject(AuthService)
) => {
  if (tokenService.isTokenExpired()) {
    authService.logout();
    return false;
  }
  return true;
};
