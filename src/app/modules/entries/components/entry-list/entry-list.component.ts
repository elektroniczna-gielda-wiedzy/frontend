import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import {
  EntryType,
  stringToEntryType,
  EntryHttpService,
  Entry,
  SORT_DEFAULT,
  SORT_KEY,
  SORT_OPTIONS,
  ResultInfo,
} from 'src/app/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit, OnDestroy {
  entryType!: EntryType;
  sortOptions = SORT_OPTIONS;
  entries: Entry[] = [];
  resultInfo?: ResultInfo = { per_page: 10, page: 1, count: 0, total_count: 0 };
  private paramMapSubscription?: Subscription;
  private entriesSubscription?: Subscription;

  filterForm = new FormGroup({
    search: new FormControl(''),
    sort: new FormControl(localStorage.getItem(SORT_KEY) || SORT_DEFAULT),
    categories: new FormControl([]),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private logger: NGXLogger,
    private cdr: ChangeDetectorRef
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

  loadEntries(event?: PageEvent): void {
    if (this.entryType !== null) {
      const params = {
        type: this.entryType,
        categories: this.filterForm.value.categories || [],
        query: this.filterForm.value.search || '',
        sort: this.filterForm.value.sort || SORT_DEFAULT,
        page: event?.pageIndex || this.resultInfo?.page || 0,
        per_page: event?.pageSize || this.resultInfo?.per_page || 10,
      };

      this.entriesSubscription = this.entryHttpService
        .getEntries(params)
        .subscribe((response) => {
          this.resultInfo = response.result_info;
          this.entries = response.result;
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

  @ViewChild('inputsContainer', { static: false }) inputsContainer?: ElementRef;

  moveToLast: boolean = false;

  ngAfterViewInit() {
    this.checkWrap();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkWrap();
  }

  checkWrap() {
    if (!this.inputsContainer) {
      return;
    }
    const container = this.inputsContainer.nativeElement;
    const children = container.children;

    if (!children || children.length === 0) {
      return;
    }

    const containerHeight = container.getBoundingClientRect().height;
    const childHeight = children[0].getBoundingClientRect().height;
    const rows = Math.round(containerHeight / childHeight);
    this.moveToLast = rows === 2;
  }

  handlePageEvent(event: PageEvent) {
    this.loadEntries(event);
  }
}
