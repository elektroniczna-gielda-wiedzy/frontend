import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import {
  EntryType,
  EntryHttpService,
  Entry,
  Author,
  UserInfo,
  ResultInfo,
  DEFAULT_RESULT_INFO,
} from 'src/app/core';
import { UserHttpService } from 'src/app/core/http/user-http.service';
import { ChatService } from 'src/app/modules/chat/services/chat.service';

@Component({
  selector: 'app-profile-entry-list',
  templateUrl: './profile-entry-list.component.html',
  styleUrls: ['./profile-entry-list.component.scss'],
})
export class ProfileEntryListComponent implements OnInit, OnDestroy {
  entryType: EntryType | null = null;
  allEntries: Entry[] = [];
  private entriesSubject = new BehaviorSubject<Entry[]>([]);
  entries$: Observable<Entry[]> = this.entriesSubject.asObservable();
  private paramMapSubscription?: Subscription;
  private entriesSubscription?: Subscription;
  page?: string;
  userId?: number;
  userInfo?: UserInfo;
  resultInfo?: ResultInfo = DEFAULT_RESULT_INFO;

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private translateService: TranslateService,
    private userHttpService: UserHttpService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.data['page'];
    if (this.page === 'entries') {
      this.loadUserEntries();
    } else if (this.page === 'favorites') {
      this.loadMyFavorites();
    } else if (this.page === 'other-user-entries') {
      const userId = this.route.snapshot.paramMap.get('userId');
      this.userId = parseInt(userId || '');
      this.loadUserEntries();
      this.fetchUserInfo();
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

  private setParams(event?: PageEvent) {
    let params: any = {
      type: this.entryType,
      page:
        event?.pageIndex || this.resultInfo?.page || DEFAULT_RESULT_INFO.page,
      per_page:
        event?.pageSize ||
        this.resultInfo?.per_page ||
        DEFAULT_RESULT_INFO.per_page,
    };
    return params;
  }

  loadUserEntries(event?: PageEvent): void {
    const params = this.setParams(event);
    params['user_id'] = this.userId;

    this.entriesSubscription = this.entryHttpService
      .getUserEntries(params)
      .subscribe((response) => {
        this.allEntries = response.result;
        this.resultInfo = response.result_info;
        this.entriesSubject.next(response.result);
      });
  }

  loadMyFavorites(event?: PageEvent): void {
    const params = this.setParams(event);

    this.entriesSubscription = this.entryHttpService
      .getMyFavorites(params)
      .subscribe((response) => {
        this.allEntries = response.result;
        this.resultInfo = response.result_info;
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
    this.resultInfo = DEFAULT_RESULT_INFO;
    this.loadEntries();
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
    this.loadUserEntries();
  }

  fetchUserInfo(): void {
    if (!this.userId) {
      return;
    }
    this.userHttpService.getUserInfo(this.userId).subscribe((response) => {
      if (response.success && response.result?.length > 0) {
        this.userInfo = response.result[0];
      }
    });
  }

  getPageTitle(): string {
    if (this.page === 'entries') {
      return this.translateService.instant('My Entries');
    } else if (this.page === 'favorites') {
      return this.translateService.instant('My Favorites');
    } else if (this.page === 'other-user-entries') {
      return this.translateService.instant('User Entries');
    } else {
      return '';
    }
  }

  contactUser() {
    if (!this.userInfo) {
      return;
    }

    this.chatService.startChatWithUser(this.userInfo);
    this.router.navigate(['/chat']);
  }

  handlePageEvent(event: PageEvent) {
    this.loadEntries(event);
  }

  loadEntries(event?: PageEvent): void {
    if (this.page === 'entries' || this.page === 'other-user-entries') {
      this.loadUserEntries(event);
    } else if (this.page === 'favorites') {
      this.loadMyFavorites(event);
    }
  }

  get defaultPageSize(): number {
    return DEFAULT_RESULT_INFO.per_page;
  }
}
