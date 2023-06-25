import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chat, ChatListItem, StandardResponse } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {
  private baseUrl = environment.apiUrl + '/chat';
  constructor(private http: HttpClient) { }

  getChatList(): Observable<StandardResponse<ChatListItem>> {
    return this.http.get<StandardResponse<ChatListItem>>(this.baseUrl);
  }

  getChat(chatId: number): Observable<StandardResponse<Chat>> {
    return this.http.get<StandardResponse<Chat>>(this.baseUrl + '/' + chatId);
  }

  createChat(other_user_id: number): Observable<StandardResponse<Chat>> {
    return this.http.post<StandardResponse<Chat>>(this.baseUrl, {other_user_id});
  }
}
