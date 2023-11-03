import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntryType, Language, TokenService, UserInfo } from 'src/app/core';
import { UserHttpService } from 'src/app/core/http/user-http.service';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  userInfo?: UserInfo;
  adminView = false;
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  constructor(
    private userHttpService: UserHttpService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    const currentUserId = this.tokenService.getUserId();
    const url = this.router.url;
    
    if (url === '/profile/details') {
      this.fetchUserInfo(currentUserId);
    } else if (
      url.startsWith('/admin-dashboard/users/') &&
      this.tokenService.isAdmin()
    ) {
      this.adminView = true;
      const userId = this.route.snapshot.paramMap.get('id');
      this.fetchUserInfo(parseInt(userId || ''));
    }
    this.initLanguage();
  }

  ngOnDestroy() {
    this.langChangeSubscription?.unsubscribe();
  }

  initLanguage() {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  fetchUserInfo(userId: number | null) {
    if (!userId) {
      return;
    }
    this.userHttpService.getUserInfo(userId).subscribe((response) => {
      if (response.success && response.result?.length > 0) {
        this.userInfo = response.result[0];
      }
    });
  }

  getLabel(entryType: EntryType) {
    switch (entryType) {
      case EntryType.Announcement:
        return 'Announcements';
      case EntryType.Note:
        return 'Notes';
      case EntryType.Post:
        return 'Posts';
      default:
        return '';
    }
  }

  userEntries(userId?: number) {
    if (!userId) {
      return;
    }
    this.router.navigate(['/profile', userId, 'entries']);
  }

  setBanned(userId?: number, isBanned?: boolean ) {
    if (!userId || isBanned === undefined) {
      return;
    }

    this.userHttpService.setBanned(userId, isBanned).subscribe({
      next: (response) => {
        if (response.success) {
          this.userInfo = {
            ...this.userInfo!,
            is_banned: isBanned,
          };
        }
      },
    });
  }

  isCurrentUser(userId?: number) {
    if (!userId) {
      return false;
    }
    return this.tokenService.getUserId() === userId;
  }
}
