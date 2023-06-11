import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  StandardResponse,
  TokenResponse,
  UserSignInCredentials,
  UserSignUpCredentials,
  TokenService
} from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(userCredentials: UserSignInCredentials): Observable<StandardResponse<TokenResponse>> {
    return this.http.post<StandardResponse<TokenResponse>>(`${this.apiUrl}/sign_in`, userCredentials);
  }

  register(userCredentials: UserSignUpCredentials): Observable<StandardResponse<null>> {
    return this.http.post<StandardResponse<null>>(`${this.apiUrl}/sign_up`, userCredentials);
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
