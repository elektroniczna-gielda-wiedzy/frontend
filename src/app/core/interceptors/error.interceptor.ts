import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private logger: NGXLogger) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.logger.trace("Passed through the interceptor in request");
    return next.handle(request).pipe(
    //   map(res => {
    //     this.logger.trace("Passed through the interceptor in response");
    //     return res
    //  }),
      catchError((error: HttpErrorResponse) => {
        this.logger.error('ErrorInterceptor: ', error);

        // this.authService.logout();

        // if (error.status === 401) {
        //   this.authService.logout();
        // }

        return throwError((() => error));
      })
    );
  }
}
