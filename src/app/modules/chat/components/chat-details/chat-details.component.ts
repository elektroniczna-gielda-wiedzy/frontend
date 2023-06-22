import { Component, Input, SimpleChanges } from '@angular/core';
import { ChatHttpService } from '../../services/chat-http.service';
import { Chat, ChatMessage } from 'src/app/core';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent {
  @Input() chatId: number | null | undefined = null;
  @Input() newMessage: ChatMessage | null | undefined = null;
  chat?: Chat;
  private chatSubscription?: Subscription;
  messageForm = this.fb.group({
    messageContent: [''],
  });

  constructor(
    private chatHttpService: ChatHttpService,
    private chatService: ChatService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['chatId'] &&
      changes['chatId'].currentValue !== changes['chatId'].previousValue
    ) {
      if (changes['chatId'].currentValue !== -1) {
        this.loadChatDetails();
      }
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
      this.chat = JSON.parse(JSON.stringify(response.result[0]));
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
    if (this.chatId && this.chatId !== -1) {
      const message: ChatMessage = {
        message_id: 1,
        content: this.messageForm.value.messageContent,
        chat_id: this.chatId,
        sender: {
          user_id: 1,
          first_name: 'Adam',
          last_name: 'Kowalski',
        },
        date_sent: new Date().toISOString(),
      };

      this.chatService.sendMessage(this.chatId, JSON.stringify(message));
      this.messageForm.reset();
    } else {
      console.log('new chat');
      const otherUserId = this.chatService.getUser()?.user_id;
      if (otherUserId) {
        this.chatHttpService
          .createChat(otherUserId, this.messageForm.value.messageContent)
          .subscribe((response) => {
            console.log(response);
            this.messageForm.reset();
          });
      }
    }
  }
}
