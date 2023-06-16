import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NGXLogger } from 'ngx-logger';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    private tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the token is expired
    const token = request.headers.get('Authorization');
    if (token && this.tokenService.isTokenExpired(token)) {
      this.logger.error('ErrorInterceptor: Token is expired');
      this.authService.logout();
      return throwError(() => new Error('Token is expired'));
    }

    return next.handle(request)
  }
}
