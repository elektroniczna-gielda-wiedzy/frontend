import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Author, UserInfo } from '../models/user';
import { StandardResponse } from '../models/standard-response';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private readonly apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient) {}

  getUserInfo(userId: number): Observable<StandardResponse<UserInfo>> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<StandardResponse<UserInfo>>(url, { headers });
  }

  getUsers(params: {
    search?: string;
    isEmailAuth?: string;
    isBanned?: string;
  } = {}): Observable<StandardResponse<Author>> {
    const url = `${this.apiUrl}/`;
    let queryParams = {
      params: new HttpParams(),
      headers: { 'Content-Type': 'application/json' },
    };
    queryParams.params = queryParams.params.set('q', '');
    if (params.search) {
      queryParams.params = queryParams.params.set('q', params.search);
    }

    if (params.isEmailAuth) {
      queryParams.params = queryParams.params.set(
        'is_email_auth',
        params.isEmailAuth.toString()
      );
    }

    if (params.isBanned) {
      queryParams.params = queryParams.params.set(
        'is_banned',
        params.isBanned.toString()
      );
    }

    return this.http.get<StandardResponse<Author>>(url, queryParams);
  }
}
