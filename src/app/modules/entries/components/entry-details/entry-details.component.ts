import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntryType, stringToEntryType } from 'src/app/core';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
})
export class EntryDetailsComponent {
  entryType!: EntryType;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.entryType = stringToEntryType(
      this.route.snapshot.paramMap.get('entryType')!
    );
  }
}
