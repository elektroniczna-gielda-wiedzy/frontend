import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';
import { authGuard } from 'src/app/core';

const routes: Routes = [
  { path: '', component: ChatListComponent, canActivate: [authGuard] },
  // { path: '/:id', component: ChatDetailsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
