import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Author, ChatListItem, ChatMessage } from 'src/app/core';
import { ChatHttpService } from '../../services/chat-http.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  private messagesSubscription?: Subscription;
  currentChatId: number | null | undefined = null;
  messages: any[] = [];
  newMessage: ChatMessage | null | undefined = null;
  chatList: ChatListItem[] = []
  private chatListSubscription?: Subscription;

  otherUser?: Author;

  constructor(private chatService: ChatService, private chatHttpService: ChatHttpService) {}

  ngOnInit(): void {
    this.initReceiveMessage();
    this.initChatList();
    this.initNewChat();
  }

  handleNewMessage(message: ChatMessage) {
    this.chatList.forEach((chat) => {
      if (chat.chat_id === message.chat_id) {
        chat.last_message = message;
      }
    });
    if (message.chat_id === this.currentChatId) {
      this.newMessage = message;
    }
  }


  initReceiveMessage() {
    this.messagesSubscription = this.chatService
    .getMessageSubject()
    .subscribe((message: any) => {
      const messageParsed = JSON.parse(message);
      this.handleNewMessage(messageParsed);
    });
  }

  initChatList() {
    this.chatListSubscription = this.chatHttpService.getChatList().subscribe((response) => {
      this.chatList = response.result;
      if (this.currentChatId === null && this.chatList.length > 0) {
        this.currentChatId = this.chatList[0].chat_id;
      }
      this.subscribeToChats();
    });
  }

  initNewChat() {
    const otherUser = this.chatService.getUser()
    if (otherUser) {
      this.otherUser = {...otherUser};
      this.chatList = [
        {
          chat_id: -1,
          other_user: this.otherUser,
        },
        ...this.chatList
      ]
      this.currentChatId = -1;
    }
  }

  subscribeToChats() {
    this.chatList.forEach((chat) => {
      this.chatService.subscribeToChat(chat.chat_id);
    });
  }

  ngOnDestroy(): void {
    this.chatService.stopChatWithUser();
    this.chatService.unsubscribeFromAllChats();
    this.messagesSubscription?.unsubscribe();
    this.chatListSubscription?.unsubscribe();
  }


  senderName(chat: ChatListItem) {
    return chat.last_message?.sender.user_id === chat.other_user.user_id ? chat.other_user.first_name : 'You';
  }
  
  goToChat(chatId: number) {
    this.currentChatId = chatId;
  }
}
