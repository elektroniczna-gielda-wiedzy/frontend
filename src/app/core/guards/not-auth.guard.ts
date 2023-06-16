import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service'

export const notAuthGuard: CanActivateFn = (
  route,
  state,
  tokenService = inject(TokenService),
  router = inject(Router)
) => {
  if (!tokenService.isTokenExpired()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
