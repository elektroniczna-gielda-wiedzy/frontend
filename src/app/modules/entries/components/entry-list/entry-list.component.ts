import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  EntryType,
  stringToEntryType,
  EntryHttpService,
  Entry,
} from 'src/app/core';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit, OnDestroy {
  entryType!: EntryType;

  entries: Entry[] = [];
  private paramMapSubscription: Subscription | null = null;
  private entriesSubscription: Subscription | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService
  ) {}

  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap) => {
      const entryType = paramMap.get('entryType');
      if (entryType) {
        this.entryType = stringToEntryType(entryType);
        this.loadEntries();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.entriesSubscription) {
      this.entriesSubscription.unsubscribe();
    }
  }

  loadEntries(): void {
    if (this.entryType !== null) {
      this.entriesSubscription = this.entryHttpService
        .getEntries({ type: this.entryType })
        .subscribe((response) => {
          this.entries = response.result;
        });
    }
  }

  get entryTypeName(): string {
    return EntryType[this.entryType];
  }
}
