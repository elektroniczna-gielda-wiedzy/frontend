import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { EntryType, stringToEntryType } from 'src/app/core';

@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
  styleUrls: ['./entry-add.component.scss']
})
export class EntryAddComponent {
  entryType!: EntryType;

  constructor(private readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.entryType = stringToEntryType(
      this.route.snapshot.paramMap.get('entryType')!
    ); 
  }
}
