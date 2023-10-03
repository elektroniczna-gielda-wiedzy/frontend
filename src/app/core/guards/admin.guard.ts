import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (
  route,
  state,
  tokenService = inject(TokenService),
  authService = inject(AuthService)
) => {
  if (!tokenService.isAdmin()) {
    authService.logout();
    return false;
  }
  return true;
};