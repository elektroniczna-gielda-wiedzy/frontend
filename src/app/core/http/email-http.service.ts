import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardResponse } from '../models/standard-response';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmailHttpService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  
  confirmEmail(token: string): Observable<StandardResponse<any>> {
    return this.http.put<StandardResponse<any>>(
      `${this.apiUrl}/confirm_email`,
      { token }
    );
  }

  resendConfirmationEmail(email: string): Observable<StandardResponse<any>> {
    return this.http.put<StandardResponse<any>>(
      `${this.apiUrl}/resend_email`,
      { email }
    );
  }
}

export function getEmailValidators() {
  return [
    Validators.required,
    Validators.email,
    Validators.pattern(
      /^[a-z0-9]+[\._]?[a-z0-9]+[@]student[.]agh[.]edu[.]pl$/
    ),
  ];
}
