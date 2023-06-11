import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';


export const authGuard: CanActivateFn = (
  route,
  state,
  router = inject(Router),
  tokenService = inject(TokenService)
) => {
  if (tokenService.isTokenExpired()) {
    router.navigate(['auth', 'sign-in']);
    return false;
  }
  return true;
};
