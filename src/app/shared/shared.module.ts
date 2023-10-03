import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from './components/entry-card/entry-card.component';
import { MaterialModule } from './material-module';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { IsLoggedInDirective } from './directives/is-logged-in.directive';
import { AnswerCardComponent } from './components/answer-card/answer-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsCardComponent } from './components/comments-card/comments-card.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { FullscreenImageDialogComponent } from './components/fullscreen-image-dialog/fullscreen-image-dialog.component';
import { EntryActionButtonsComponent } from './components/entry-action-buttons/entry-action-buttons.component';
import { IfAuthorOrAdminDirective } from './directives/if-author-or-admin.directive';
import { VotesWidgetComponent } from './components/votes-widget/votes-widget.component';
import { IsAdminDirective } from './directives/is-admin.directive';

@NgModule({
  declarations: [
    EntryCardComponent,
    FavoriteIconComponent,
    RelativeTimePipe,
    IsLoggedInDirective,
    AnswerCardComponent,
    CommentsCardComponent,
    CategorySelectorComponent,
    FullscreenImageDialogComponent,
    EntryActionButtonsComponent,
    IfAuthorOrAdminDirective,
    VotesWidgetComponent,
    IsAdminDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EntryCardComponent,
    FavoriteIconComponent,
    RelativeTimePipe,
    IsLoggedInDirective,
    AnswerCardComponent,
    CategorySelectorComponent,
    FullscreenImageDialogComponent,
    EntryActionButtonsComponent,
    IfAuthorOrAdminDirective,
    VotesWidgetComponent,
    IsAdminDirective
  ],
})
export class SharedModule {}
