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


  updateAnswer(
    entryId: number,
    params: AnswerRequest
  ): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer`;

    return this.http.put<StandardResponse<Answer>>(url, params);
  }

  deleteAnswer(entryId: number ,answerId : number): Observable<StandardResponse<Answer>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}`;
    console.log(url)
    return this.http.delete<StandardResponse<Answer>>(url);
  }

}
