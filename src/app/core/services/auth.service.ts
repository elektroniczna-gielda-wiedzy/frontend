import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  StandardResponse,
  TokenResponse,
  UserSignInCredentials,
  UserSignUpCredentials,
  TokenService,
} from 'src/app/core';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private loggedIn = new BehaviorSubject<boolean>(
    !this.tokenService.isTokenExpired()
  );
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(
    userCredentials: UserSignInCredentials
  ): Observable<StandardResponse<TokenResponse>> {
    return this.http
      .post<StandardResponse<TokenResponse>>(
        `${this.apiUrl}/sign_in`,
        userCredentials
      )
      .pipe(
        tap((response) => {
          if (
            response.success &&
            response.result.length > 0 &&
            response.result[0].session_token
          ) {
            this.tokenService.setToken(response.result[0].session_token);
            this.loggedIn.next(true);
          } else {
            this.loggedIn.next(false);
          }
        })
      );
  }

  register(
    userCredentials: UserSignUpCredentials
  ): Observable<StandardResponse<null>> {
    return this.http.post<StandardResponse<null>>(
      `${this.apiUrl}/sign_up`,
      userCredentials
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.loggedIn.next(false);
    this.router.navigate(['auth', 'sign-in']);
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<StandardResponse<void>> {
    const url = `${this.apiUrl}/reset_password`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<StandardResponse<void>>(
      url,
      { old_password: currentPassword, new_password: newPassword },
      { headers }
    );
  }


  modifyPassword(
    token : string,
    newPassword: string
  ): Observable<StandardResponse<void>> {
    const headers = { 'Content-Type': 'application/json' };
    console.log(newPassword)
    return this.http.put<StandardResponse<void>>(
      `${this.apiUrl}/modify_password`,
      { token: token  , new_password: newPassword },
      { headers }
    );
  }




  

}

export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}

export function differentValidator(
  differentTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[
        differentTo
      ] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }

    return !!control.parent &&
      !!control.parent.value &&
      !!control.value &&
      control.value === (control.parent?.controls as any)[differentTo].value
      ? { different: true }
      : null;
  };
}