import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Author, ChatListItem, ChatMessage } from 'src/app/core';
import { ChatHttpService } from '../../services/chat-http.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NGXLogger } from 'ngx-logger';

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
  private breakpointSubscription?: Subscription;
  noChats = false;
  isMobile = false;
  waitingForChat: number | null | undefined = null;

  constructor(
    private chatService: ChatService,
    private chatHttpService: ChatHttpService,
    private breakpointObserver: BreakpointObserver,
    private logger: NGXLogger
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
      this.handleNewChatStarted(message.chat_id);
      return;
    }

    const chat = this.chatList.splice(chatIndex, 1)[0];
    chat.last_message = message;
    this.chatList.unshift(chat);

    if (message.chat_id === this.currentChatId) {
      this.newMessage = message;
      this.markAsRead(chat);
    } else if (chat.is_read) {
      chat.is_read = false;
      this.chatService.incrementUnreadCount();
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
        this.initNewChat();
        this.subscribeToChats();
        this.initNotification();
      });
  }

  initNewChat() {
    const otherUser = this.chatService.getUser();

    if (!otherUser) {
      if (!this.isMobile && !this.currentChatId && this.chatList.length > 0) {
        this.currentChatId = this.chatList[0].chat_id;
        this.markAsRead(this.chatList[0]);
      }
      return;
    }

    const chat = this.chatList.find((chat) => {
      return chat.other_user.user_id === otherUser?.user_id;
    });

    if (chat) {
      this.currentChatId = chat.chat_id;
      if (this.isMobile) {
        this.displayChatList = [chat];
      }
      this.markAsRead(chat);
      return;
    }

    this.noChats = false;
    this.chatList.unshift({
      chat_id: -1,
      other_user: { ...otherUser },
      is_read: true,
    });
    this.currentChatId = -1;
    if (this.isMobile) {
      this.displayChatList = [this.chatList[0]];
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
          this.markAsRead(this.chatList[0]);
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
    if (chatId && chatId !== -1) {
      const chat = this.chatList.find((chat) => chat.chat_id === chatId);
      if (chat) {
        this.markAsRead(chat);
      }
    }
  }

  markAsRead(chat: ChatListItem) {
    if (chat.is_read) {
      return;
    }

    chat.is_read = true;

    this.chatHttpService.markAsRead(chat.chat_id).subscribe({
      next: (response) => {
        if (response.success) {
          this.chatService.decrementUnreadCount();
        } else {
          chat.is_read = false;
        }
      },
      error: () => {
        chat.is_read = false;
      }
    });
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
    const chatIndex = this.chatList.findIndex(
      (chat) => chat.chat_id === -1
    );
    if (chatIndex !== -1) {
      this.chatList.splice(chatIndex, 1);
    }

    const chat = this.chatList.find((chat) => chat.chat_id === chatId);
    if (chat) {
      this.goToChat(chatId);
      return;
    }
    this.waitingForChat = chatId;
  }

  handleNewChatStarted(chatId: number) {
    if (
      this.chatList.find((chat) => chat.chat_id === chatId)
    ) {
      return;
    }
    this.logger.trace('New chat started', chatId);

    

    this.chatListSubscription = this.chatHttpService
      .getChatList()
      .subscribe((response) => {
        const chat = response.result.find((chat) => chat.chat_id === chatId);
        if (chat) {
          this.noChats = false;
          this.chatList.unshift(chat);
          if (!chat.is_read) {
            this.chatService.incrementUnreadCount();
          }
          this.chatService.subscribeToChat(chatId);

          if (this.chatList.length === 1 && !this.isMobile) {
            this.currentChatId = chatId;
            this.markAsRead(chat);
          }

          if (this.waitingForChat === chatId) {
            this.currentChatId = chatId;
            this.waitingForChat = null;
            this.markAsRead(chat);
          }
        }
      });
  }
}
