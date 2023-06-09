import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from './components/entry-card/entry-card.component';
import { MaterialModule } from './material-module';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';

@NgModule({
  declarations: [
    EntryCardComponent,
    FavoriteIconComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    EntryCardComponent,
    FavoriteIconComponent,
  ]
})
export class SharedModule { }
