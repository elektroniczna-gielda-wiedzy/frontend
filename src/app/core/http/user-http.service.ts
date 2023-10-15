import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user';
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
}
