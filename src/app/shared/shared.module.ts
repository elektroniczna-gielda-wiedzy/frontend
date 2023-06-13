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


@NgModule({
  declarations: [
    EntryCardComponent,
    FavoriteIconComponent,
    RelativeTimePipe,
    IsLoggedInDirective,
   AnswerCardComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    
   FormsModule,
   ReactiveFormsModule
  ],
  exports: [
    EntryCardComponent,
    FavoriteIconComponent,
    RelativeTimePipe,
    IsLoggedInDirective,
    AnswerCardComponent
  ]
})
export class SharedModule { }
