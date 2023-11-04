import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Author, UserInfo } from '../models/user';
import { StandardResponse } from '../models/standard-response';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private readonly apiUrl = `${environment.apiUrl}/user`;
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  getUserInfo(userId: number): Observable<StandardResponse<UserInfo>> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get<StandardResponse<UserInfo>>(url, { headers });
  }

  getUsers(
    params: {
      search?: string;
      isEmailAuth?: string;
      isBanned?: string;
      page?: number;
      per_page?: number;
    } = {}
  ): Observable<StandardResponse<UserInfo>> {
    const url = `${this.apiUrl}`;
    let queryParams = {
      params: new HttpParams(),
      headers: { 'Content-Type': 'application/json' },
    };

    if (params.search) {
      queryParams.params = queryParams.params.set('query', params.search);
    }

    if (params.isEmailAuth) {
      queryParams.params = queryParams.params.set(
        'is_email_auth',
        params.isEmailAuth
      );
    }

    if (params.isBanned) {
      queryParams.params = queryParams.params.set('is_banned', params.isBanned);
    }

    if (params.page) {
      queryParams.params = queryParams.params.set('page', params.page);
    }

    if (params.per_page) {
      queryParams.params = queryParams.params.set('per_page', params.per_page);
    }

    return this.http.get<StandardResponse<Author>>(url, queryParams);
  }

  setBanned(
    userId: number,
    isBanned: boolean
  ): Observable<StandardResponse<void>> {
    const url = `${this.apiUrl}/${userId}/ban`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http
      .put<StandardResponse<void>>(url, { value: isBanned }, { headers })
      .pipe(
        catchError((err) => {
          this.displayError(err);
          return throwError(() => err);
        })
      );
  }

  private displayError(err: any) {
    const msgs = err?.error?.messages || [];
    const msg = msgs.join(' ').toLowerCase();
    if (msg.includes('ban yourself')) {
      this.displayMessage('--ban-yourself-msg');
    } else if (msg.includes('does not exist')) {
      const regex = /id = (\d+)/;
      const match = msg.match(regex);
      if (match) {
        const id = match[1];
        this.displayMessage('--user-id-not-found-msg', { id });
      } else {
        this.displayMessage('--user-not-found-msg');
      }
    } else if (msg.includes('is an admin')) {
      this.displayMessage('--ban-admin-msg');
    }
  }

  private displayMessage(message: string, params = {}) {
    this.snackbar.open(
      this.translateService.instant(message, params),
      this.translateService.instant('Close'),
      {
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
  }
}
