import { Injectable } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Subject, Subscription } from 'rxjs';
import { RxStompService } from './rx-stomp.service';
import { myRxStompConfig } from './my-rx-stomp.config';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatSubscriptions: Map<number, Subscription> = new Map();
  private messageSubject = new Subject<any>();

  constructor(
    private rxStompService: RxStompService,
    private logger: NGXLogger
  ) {}

  sendMessage(chatId: number, message: any) {
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

  getMessageSubject(): Subject<any> {
    return this.messageSubject;
  }
}
