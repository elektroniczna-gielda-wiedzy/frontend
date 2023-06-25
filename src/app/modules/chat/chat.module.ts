import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChatDetailsComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ChatModule { }
