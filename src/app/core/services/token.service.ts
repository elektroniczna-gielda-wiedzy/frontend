import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY, TokenPayload } from '../models/token';

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

  getDecodedToken(token: string = TokenService.getToken()): TokenPayload | null {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken : null;
  }

  getUserId(token: string = TokenService.getToken()): number | null {
    const decodedToken = this.getDecodedToken(token);
    return decodedToken ? decodedToken.user : null;
  }

  getUserRole(token: string = TokenService.getToken()): string | null {
    const decodedToken = this.getDecodedToken(token);
    return decodedToken ? decodedToken.role : null;
  }

  isAdmin(token: string = TokenService.getToken()): boolean {
    return this.getUserRole(token) === 'ADMIN';
  }
}
