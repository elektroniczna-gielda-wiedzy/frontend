import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from './components/entry-card/entry-card.component';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    EntryCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    EntryCardComponent
  ]
})
export class SharedModule { }
