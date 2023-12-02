import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RxStompService } from './rx-stomp.service';
import { myRxStompConfig } from './my-rx-stomp.config';
import { NGXLogger } from 'ngx-logger';
import { AuthService, Author, TokenService } from 'src/app/core';
import { ChatHttpService } from './chat-http.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messageSubject = new Subject<string>();
  user?: Author | null = null;
  private unreadCount = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCount.asObservable();

  constructor(
    private rxStompService: RxStompService,
    private logger: NGXLogger,
    private chatHttpService: ChatHttpService,
    private tokenService: TokenService,
    private authService: AuthService,
  ) {}

  sendMessage(chatId: number, message: string) {
    if (this.tokenService.isTokenExpired()) {
      this.authService.logout();
      return;
    }

    this.rxStompService.publish({
      destination: `/api/v1/chat/${chatId}`,
      body: message,
    });
  }

  notificationQueue() {
    return this.rxStompService.watch(`/user/queue/notification`);
  }

  messageQueue() {
    return this.rxStompService.watch(`/user/queue/message`);
  }

  connect() {
    this.rxStompService.configure(myRxStompConfig());
    this.rxStompService.activate();
  }

  disconnect() {
    this.rxStompService.deactivate();
  }

  getMessageSubject(): Subject<string> {
    return this.messageSubject;
  }

  startChatWithUser(user: Author) {
    this.user = user;
  }
  
  getUser() {
    return this.user;
  }

  stopChatWithUser() {
    this.user = null;
  }

  updateUnreadCount() {
    this.chatHttpService.getUnreadCount().subscribe(
      (response) => {
        this.unreadCount.next(response.result[0]);
      }
    );
  }

  decrementUnreadCount() {
    this.unreadCount.next(this.unreadCount.value - 1);
  }

  incrementUnreadCount() {
    this.unreadCount.next(this.unreadCount.value + 1);
  }
}
