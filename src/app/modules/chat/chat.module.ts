import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';


@NgModule({
  declarations: [
    ChatDetailsComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
