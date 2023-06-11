import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenResponse, UserSignInCredentials } from '../models/user';
import { StandardResponse } from '../models/standard-response';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(userCredentials: UserSignInCredentials): Observable<StandardResponse<TokenResponse>> {
    return this.http.post<StandardResponse<TokenResponse>>(`${this.apiUrl}/sign_in`, userCredentials);
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
