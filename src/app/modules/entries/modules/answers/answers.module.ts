import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerActionButtonsComponent } from './components/answer-action-buttons/answer-action-buttons.component';
import { AnswerCardComponent } from './components/answer-card/answer-card.component';
import { AnswerEditPopupComponent } from './components/answer-edit-popup/answer-edit-popup.component';
import { CommentsModule } from '../comments/comments.module';
import { TopAnswerWidgetComponent } from './components/top-answer-widget/top-answer-widget.component';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnswerActionButtonsComponent,
    AnswerCardComponent,
    AnswerEditPopupComponent,
    TopAnswerWidgetComponent
  ],
  imports: [
    CommonModule,
    CommentsModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    AnswerCardComponent,
    AnswerEditPopupComponent
  ]
})
export class AnswersModule { }
