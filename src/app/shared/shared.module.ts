import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from './components/entry-card/entry-card.component';
import { MaterialModule } from './material-module';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EntryCardComponent,
    FavoriteIconComponent,
    RelativeTimePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    EntryCardComponent,
    FavoriteIconComponent,
    RelativeTimePipe
  ]
})
export class SharedModule { }
