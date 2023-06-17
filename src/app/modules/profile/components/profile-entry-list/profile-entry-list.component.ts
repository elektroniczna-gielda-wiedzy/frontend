import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import {
  EntryType,
  EntryHttpService,
  Entry,
} from 'src/app/core';

@Component({
  selector: 'app-profile-entry-list',
  templateUrl: './profile-entry-list.component.html',
  styleUrls: ['./profile-entry-list.component.scss']
})
export class ProfileEntryListComponent implements OnInit, OnDestroy {
  entryType: EntryType | null = null;
  allEntries: Entry[] = [];
  private entriesSubject = new BehaviorSubject<Entry[]>([]);
  entries$: Observable<Entry[]> = this.entriesSubject.asObservable();
  private paramMapSubscription?: Subscription;
  private entriesSubscription?: Subscription;
  page?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];
    if (this.page === 'entries') {
      this.loadMyEntries();
    } else if (this.page === 'favorites') {
      this.loadMyFavorites();
    }
  }

  ngOnDestroy(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.entriesSubscription) {
      this.entriesSubscription.unsubscribe();
    }
  }
  loadMyEntries(): void {
    this.entriesSubscription = this.entryHttpService
      .getMyEntries()
      .subscribe((response) => {
        this.allEntries = response.result;
        this.entriesSubject.next(response.result);
      });
  }

  loadMyFavorites(): void {
    this.entriesSubscription = this.entryHttpService
      .getMyFavorites()
      .subscribe((response) => {
        this.allEntries = response.result;
        this.entriesSubject.next(response.result);
      });
  }

  onTabChange(event: any): void {
    switch (event.index) {
      case 0:
        this.entryType = null;
        break;
      case 1:
        this.entryType = EntryType.Post;
        break;
      case 2:
        this.entryType = EntryType.Note;
        break;
      case 3:
        this.entryType = EntryType.Announcement;
        break;
      default:
        break;
    }
    this.updateEntries();
  }

  private updateEntries(): void {
    if (!this.entryType) {
      this.entriesSubject.next(this.allEntries);
      return;
    }
    this.entriesSubject.next(this.allEntries.filter((entry) => entry.entry_type_id === this.entryType));
  }

  getLabel(label: string): string {
    switch (label) {
      case 'All':
        return this.translateService.instant('All');
      case 'Posts':
        return this.translateService.instant('Posts');
      case 'Notes':
        return this.translateService.instant('Notes');
      case 'Announcements':
        return this.translateService.instant('Announcements');
      default:
        return 'All';
    }
  }

  onEntryDeleted(entryId: number): void {
    this.loadMyEntries()
  }
}