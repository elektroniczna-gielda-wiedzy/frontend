import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  private chatId = 1;
  private messagesSubscription?: Subscription;
  public messages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.subscribeToChat(this.chatId);
    this.messagesSubscription = this.chatService
      .getMessageSubject()
      .subscribe((message: any) => {
        this.messages.push(message);

        console.log(message);
      });
  }

  ngOnDestroy(): void {
    this.chatService.unsubscribeFromAllChats();
    this.messagesSubscription?.unsubscribe();
  }

  sendMessage(message: string = 'hello world') {
    this.chatService.sendMessage(
      this.chatId,
      new Date().toLocaleTimeString() + ': ' + message
    );
  }
}
