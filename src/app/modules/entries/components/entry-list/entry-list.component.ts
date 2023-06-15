import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
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
  private paramMapSubscription?: Subscription;
  private entriesSubscription?: Subscription;

  filterForm = new FormGroup({
    search: new FormControl(''),
    categories: new FormControl([]),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private logger: NGXLogger
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
      const categories = this.filterForm.value.categories || [];
      const query = this.filterForm.value.search || '';
      this.entriesSubscription = this.entryHttpService
        .getEntries({ type: this.entryType, categories, query })
        .subscribe((response) => {
          this.entries = response.result;
          console.log(response);
        });
    }
  }

  get entryTypeName(): string {
    return EntryType[this.entryType].toLowerCase();
  }

  applyFilter() {
    this.logger.info(this.filterForm.value);
    this.loadEntries();
  }
  clearFilter() {
    this.filterForm.reset();
    this.loadEntries();
  }
}
