import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ChatHttpService } from '../../services/chat-http.service';
import { Chat, ChatMessage, Language } from 'src/app/core';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent {
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;
  @Input() chatId: number | null | undefined = null;
  @Input() newMessage: ChatMessage | null | undefined = null;
  @Output() createChatCompleted: EventEmitter<number> =
    new EventEmitter<number>();
  chat: Chat | null | undefined;
  private chatSubscription?: Subscription;
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  messageForm = this.fb.group({
    messageContent: [''],
  });

  constructor(
    private chatHttpService: ChatHttpService,
    private chatService: ChatService,
    private fb: FormBuilder,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.initLanguage();
  }

  initLanguage() {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (!this.myScrollContainer) {
      return;
    }
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
    this.langChangeSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['chatId'] &&
      changes['chatId'].currentValue !== changes['chatId'].previousValue
    ) {
      if (changes['chatId'].currentValue !== -1) {
        this.loadChatDetails();
      } else {
        this.chat = null;
      }
      this.messageForm.reset();
    }

    if (
      changes['newMessage'] &&
      changes['newMessage'].currentValue &&
      changes['newMessage'].currentValue !== changes['newMessage'].previousValue
    ) {
      this.chat?.messages.push(changes['newMessage'].currentValue);
    }
  }

  loadChatDetails() {
    if (!this.chatId) {
      return;
    }
    this.chatHttpService.getChat(this.chatId).subscribe((response) => {
      this.chat = response.result[0];
    });
  }

  isOwnMessage(message: ChatMessage) {
    if (!this.chat || !message.sender) {
      return false;
    }
    return message.sender.user_id !== this.chat?.other_user_id;
  }

  senderName(message: ChatMessage) {
    return this.isOwnMessage(message) ? 'You' : message.sender.first_name;
  }

  sendMessage() {
    if (!this.messageForm.value.messageContent) {
      return;
    }
    const message = {
      content: this.messageForm.value.messageContent,
    };
    const parsedMessage = JSON.stringify(message);

    if (this.chatId === -1) {
      this.createChat(parsedMessage);
      return;
    }
    this.sendMessageToChat(parsedMessage);
  }

  private sendMessageToChat(message: string) {
    if (this.chatId && this.chatId !== -1) {
      this.chatService.sendMessage(this.chatId, message);
      this.messageForm.reset();
    }
  }

  private createChat(message: string) {
    const otherUserId = this.chatService.getUser()?.user_id;
    if (!otherUserId) {
      return;
    }

    this.chatHttpService.createChat(otherUserId).subscribe((response) => {
      this.chatId = response.result[0].chat_id;
      this.createChatCompleted.emit(this.chatId);
      this.chatService.subscribeToChat(this.chatId);
      this.sendMessageToChat(message);
    });
  }
}
