import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Answer, AnswerRequest } from '../models/answer';
import { StandardResponse } from '../models/standard-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerHttpService {
  private readonly apiUrl = `${environment.apiUrl}/entry`;
  constructor(private http: HttpClient) { }

  addAnswer(entryId: number, answer: AnswerRequest): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer`;
    return this.http.post<StandardResponse<Answer>>(url, answer);
  }
}
