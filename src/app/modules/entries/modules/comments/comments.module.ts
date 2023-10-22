import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsCardComponent } from './components/comments-card/comments-card.component';
import { CommentActionButtonsComponent } from './components/comment-action-buttons/comment-action-buttons.component';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CommentsCardComponent,
    CommentActionButtonsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    CommentsCardComponent
  ]

})
export class CommentsModule { }
