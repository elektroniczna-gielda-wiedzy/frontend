import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { ChatListItem } from 'src/app/core';
import { ChatHttpService } from '../../services/chat-http.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  private chatId = 1;
  private messagesSubscription?: Subscription;
  currentChatId = 1;
  messages: any[] = [];
  chatList: ChatListItem[] = []
  private chatListSubscription?: Subscription;

  constructor(private chatService: ChatService, private chatHttpService: ChatHttpService) {}

  ngOnInit(): void {
    this.chatService.subscribeToChat(this.chatId);
    this.messagesSubscription = this.chatService
      .getMessageSubject()
      .subscribe((message: any) => {
        this.messages.push(message);

        console.log(message);
      });
    this.chatListSubscription = this.chatHttpService.getChatList().subscribe((response) => {
      this.chatList = response.result;
    });

  }

  ngOnDestroy(): void {
    this.chatService.unsubscribeFromAllChats();
    this.messagesSubscription?.unsubscribe();
    this.chatListSubscription?.unsubscribe();
  }

  sendMessage(message: string = 'hello world') {
    this.chatService.sendMessage(
      this.chatId,
      new Date().toLocaleTimeString() + ': ' + message
    );
  }

  senderName(chat: ChatListItem) {
    return chat.last_message.sender.user_id === chat.other_user.user_id ? chat.other_user.first_name : 'You';
  }
  
  goToChat(chatId: number) {
    this.currentChatId = chatId;
  }
}
