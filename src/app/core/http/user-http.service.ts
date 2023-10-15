import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private readonly apiUrl = `${environment.apiUrl}/entry`;
  constructor(private http: HttpClient){ }

  getUserInfo(userId: number) {
    return this.http.get<UserInfo>(`/api/users/${userId}`);
  }
}
