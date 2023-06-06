import { Component, Input } from '@angular/core';
import { Entry } from 'src/app/core';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss']
})
export class EntryCardComponent {
  @Input() entry!: Entry;

}
