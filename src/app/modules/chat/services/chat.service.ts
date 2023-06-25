import { Injectable } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { RxStompService } from './rx-stomp.service';
import { myRxStompConfig } from './my-rx-stomp.config';
import { NGXLogger } from 'ngx-logger';
import { Author } from 'src/app/core';
import { ChatHttpService } from './chat-http.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatSubscriptions: Map<number, Subscription> = new Map();
  private messageSubject = new Subject<string>();
  user?: Author | null = null;
  private unreadCount = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCount.asObservable();

  constructor(
    private rxStompService: RxStompService,
    private logger: NGXLogger,
    private chatHttpService: ChatHttpService
  ) {}

  sendMessage(chatId: number, message: string) {
    this.rxStompService.publish({
      destination: `/api/v1/chat/${chatId}`,
      body: message,
    });
  }

  subscribeToChat(chatId: number) {
    const subscription = this.rxStompService
      .watch(`/topic/chat/${chatId}`)
      .subscribe((message: Message) => {
        this.logger.trace(
          'New message with chatId: ' + chatId + '\nContent: ' + message.body
        );
        this.messageSubject.next(message.body);
      });
    this.chatSubscriptions.set(chatId, subscription);
  }

  notifications() {
    return this.rxStompService.watch(`/user/queue/notification`);
  }

  unsubscribeFromAllChats() {
    this.chatSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.chatSubscriptions.clear();
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

  initUnreadCount() {
    this.chatHttpService.getUnreadCount().subscribe(
      (response) => {
        this.unreadCount.next(response.result[0]);
      }
    );
  }
}
