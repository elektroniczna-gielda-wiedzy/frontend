import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(public jwtHelper: JwtHelperService) { }


  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isTokenExpired(token: string = TokenService.getToken()): boolean {
    // console.log(this.jwtHelper.decodeToken(token));
    return this.jwtHelper.isTokenExpired(token);
  }
}
