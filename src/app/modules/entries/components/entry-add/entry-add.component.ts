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
