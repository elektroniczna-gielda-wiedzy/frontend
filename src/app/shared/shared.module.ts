import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from './components/entry-card/entry-card.component';


@NgModule({
  declarations: [
    EntryCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryCardComponent
  ]
})
export class SharedModule { }
