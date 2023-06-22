import { Component, Input, SimpleChanges } from '@angular/core';
import { ChatHttpService } from '../../services/chat-http.service';
import { Chat, ChatMessage } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss'],
})
export class ChatDetailsComponent {
  @Input() chatId = 1;
  chat?: Chat;
  private chatSubscription?: Subscription;

  constructor(private chatHttpService: ChatHttpService) {}

  ngOnInit(): void {
    this.loadChatDetails();
  }

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['chatId'] &&
      changes['chatId'].currentValue !== changes['chatId'].previousValue
    ) {
      this.loadChatDetails();
    }
  }

  loadChatDetails() {
    this.chatHttpService.getChat(this.chatId).subscribe((response) => {
      console.log(response);
      this.chat = response.result[0];
    });
  }

  isOwnMessage(message: ChatMessage) {
    return message.sender.user_id !== this.chat?.other_user_id;
  }

  senderName(message: ChatMessage) {
    return this.isOwnMessage(message) ? 'You' : message.sender.first_name;
  }
}
