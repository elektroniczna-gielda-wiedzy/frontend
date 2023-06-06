import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { EntryType, stringToEntryType } from 'src/app/core';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss']
})
export class EntryDetailsComponent {
  entryType: EntryType | null = null;

  constructor(private readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      first()
    ).subscribe(
      paramMap => {
        const entryType = paramMap.get('entryType');
        if (entryType) {
          this.entryType = stringToEntryType(entryType);
        }
      }
    );
  }
}
