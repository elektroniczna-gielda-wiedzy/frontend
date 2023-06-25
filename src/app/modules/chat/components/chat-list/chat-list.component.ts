import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Author, ChatListItem, ChatMessage } from 'src/app/core';
import { ChatHttpService } from '../../services/chat-http.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  private messagesSubscription?: Subscription;
  currentChatId: number | null | undefined = null;
  newMessage: ChatMessage | null | undefined = null;
  chatList: ChatListItem[] = [];
  displayChatList: ChatListItem[] = [];
  private chatListSubscription?: Subscription;
  private notificationSubscription?: Subscription;
  private chatSubscription?: Subscription;
  private breakpointSubscription?: Subscription;
  noChats = false;
  isMobile = false;

  constructor(
    private chatService: ChatService,
    private chatHttpService: ChatHttpService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.initBreakPoint();
    this.initReceiveMessage();
    this.initChatList();
  }

  handleNewMessage(message: ChatMessage) {
    const chatIndex = this.chatList.findIndex(
      (chat) => chat.chat_id === message.chat_id
    );
    if (chatIndex === -1) {
      return;
    }

    const chat = this.chatList.splice(chatIndex, 1)[0];
    chat.last_message = message;
    this.chatList.unshift(chat);

    if (message.chat_id === this.currentChatId) {
      this.newMessage = message;
    }
  }

  initReceiveMessage() {
    this.messagesSubscription = this.chatService
      .getMessageSubject()
      .subscribe((message: string) => {
        this.handleNewMessage(JSON.parse(message));
      });
  }

  initChatList() {
    this.chatListSubscription = this.chatHttpService
      .getChatList()
      .subscribe((response) => {
        this.chatList = response.result;
        this.displayChatList = this.chatList;
        this.noChats = this.chatList.length === 0;
        if (!this.isMobile && !this.currentChatId && this.chatList.length > 0) {
          this.currentChatId = this.chatList[0].chat_id;
        }
        this.subscribeToChats();
        this.initNotification();
        this.initNewChat();
      });
  }

  initNewChat() {
    const otherUser = this.chatService.getUser();

    const chat = this.chatList.find((chat) => {
      return chat.other_user.user_id === otherUser?.user_id;
    });

    if (chat && otherUser) {
      this.currentChatId = chat.chat_id;
      return;
    }

    if (otherUser) {
      this.noChats = false;
      this.chatList = [
        {
          chat_id: -1,
          other_user: { ...otherUser },
        },
        ...this.chatList,
      ];
      this.currentChatId = -1;
    }
  }

  initNotification() {
    this.notificationSubscription = this.chatService
      .notifications()
      .subscribe((notification) => {
        const { chat_id } = JSON.parse(notification.body);
        this.handleNewChatStarted(chat_id);
      });
  }

  subscribeToChats() {
    this.chatList.forEach((chat) => {
      this.chatService.subscribeToChat(chat.chat_id);
    });
  }

  initBreakPoint() {
    this.breakpointSubscription = this.breakpointObserver
      .observe('(max-width: 800px)')
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile && !this.currentChatId && this.chatList.length > 0) {
          this.currentChatId = this.chatList[0].chat_id;
        } else if (this.isMobile && this.currentChatId) {
          this.displayChatList = this.chatList.filter(
            (chat) => chat.chat_id === this.currentChatId
          );
        } else {
          this.displayChatList = this.chatList;
        }
      });
  }

  ngOnDestroy(): void {
    this.chatService.stopChatWithUser();
    this.chatService.unsubscribeFromAllChats();
    this.notificationSubscription?.unsubscribe();
    this.messagesSubscription?.unsubscribe();
    this.chatListSubscription?.unsubscribe();
    this.chatSubscription?.unsubscribe();
    this.breakpointSubscription?.unsubscribe();
  }

  senderName(chat: ChatListItem) {
    return chat.last_message?.sender.user_id === chat.other_user.user_id
      ? chat.other_user.first_name
      : 'You';
  }

  goToChat(chatId: number) {
    this.currentChatId = chatId;
    this.newMessage = null;
    if (this.isMobile) {
      this.displayChatList = this.chatList.filter(
        (chat) => chat.chat_id === chatId
      );
    }
  }

  goToList(event: Event) {
    event.stopPropagation();
    this.currentChatId = null;
    this.newMessage = null;
    if (this.isMobile) {
      this.displayChatList = this.chatList;
    }
  }

  createChatCompleted(chatId: number) {
    this.chatService.stopChatWithUser();
    this.chatList[0].chat_id = chatId;
    this.currentChatId = chatId;
    this.chatService.subscribeToChat(chatId);
  }

  handleNewChatStarted(chatId: number) {
    if (
      this.chatSubscription ||
      this.chatList.find((chat) => chat.chat_id === chatId)
    ) {
      return;
    }

    this.chatSubscription = this.chatHttpService
      .getChat(chatId)
      .subscribe((response) => {
        this.noChats = false;
        const chat = response.result[0];
        this.chatList.unshift({
          chat_id: chat.chat_id,
          other_user: chat.messages[0].sender,
          last_message: chat.messages.at(-1),
        });
        this.chatService.subscribeToChat(chatId);
      });
  }
}