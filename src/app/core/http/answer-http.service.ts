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

  getAnswers(entryId: number): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer`;
    return this.http.get<StandardResponse<Answer>>(url);
  }

  addAnswer(entryId: number, answer: AnswerRequest): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer`;
    return this.http.post<StandardResponse<Answer>>(url, answer);
  }


  updateAnswer(
    entryId: number,
    answerId: number,
    answer: AnswerRequest
  ): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}`;

    return this.http.put<StandardResponse<Answer>>(url, answer);
  }

  deleteAnswer(entryId: number ,answerId : number): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}`;
    return this.http.delete<StandardResponse<Answer>>(url);
  }

  changeTopAnswer(entryId: number, answerId: number, value: 1 | -1): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}/top`;
    return this.http.put<StandardResponse<Answer>>(url, {value});
  }
}
