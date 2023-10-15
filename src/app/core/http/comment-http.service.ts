import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment, CommentRequest } from '../models/comment';
import { StandardResponse } from '../models/standard-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentHttpService {
  private readonly apiUrl = `${environment.apiUrl}/entry`;
  constructor(private http: HttpClient) { }

  getComments(entryId: number , answerId: number ): Observable<StandardResponse<Comment>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}/comment`;
    return this.http.get<StandardResponse<Comment>>(url);
    
  }

  addComment(entryId: number,answerId: number,  comment: CommentRequest): Observable<StandardResponse<Comment>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}/comment`;
    return this.http.post<StandardResponse<Comment>>(url, comment);
  }


  updateComment(
    entryId: number,
    answerId: number,
    commentId: number, 
    comment: CommentRequest
  ): Observable<StandardResponse<Comment>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}/comment/${commentId}`;

    return this.http.put<StandardResponse<Comment>>(url, comment);
  }

  deleteComment(entryId: number, answerId: number, commentId: number ): Observable<StandardResponse<Comment>> {
    const url = `${this.apiUrl}/${entryId}/answer/${answerId}/comment/${commentId}`;
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.delete<StandardResponse<Comment>>(url ,{headers: headers});
  }

}
