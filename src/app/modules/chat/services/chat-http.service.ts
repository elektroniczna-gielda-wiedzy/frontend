import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chat, ChatListItem, StandardResponse } from 'src/app/core';
import { CHAT, CHAT_LIST } from 'src/app/core/mocks/chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {
  private baseUrl = environment.apiUrl + '/chat';
  constructor(private http: HttpClient) { }

  getChatList(): Observable<StandardResponse<ChatListItem>> {
    // return this.http.get<StandardResponse<ChatListItem>>(this.baseUrl);
    return of({result: CHAT_LIST, messages: [], success: false});
  }

  getChat(chatId: number): Observable<StandardResponse<Chat>> {
    // return this.http.get<StandardResponse<Chat>>(this.baseUrl + '/' + chatId);
    return of({result: [CHAT], messages: [], success: false});
  }
}
