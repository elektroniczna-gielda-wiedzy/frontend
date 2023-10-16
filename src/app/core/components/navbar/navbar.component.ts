import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ChatService } from 'src/app/modules/chat/services/chat.service';
import { NGXLogger } from 'ngx-logger';
import { Message } from '@stomp/stompjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private isLoggedInSubscription?: Subscription;
  private notificationsSubscription?: Subscription;
  profileDropdownOpen = false;
  adminDropdownOpen = false;
  links: { url: string; label: string, badge?: Observable<number> }[] = [];
  profileLinks = [
    { url: '/profile/entries', label: 'My entries' },
    { url: '/profile/favorites', label: 'My favorites' },
    { url: '/profile/details', label: 'Profile details' },
  ];
  adminLinks = [
    { url: '/categories', label: 'Categories' },
    { url: '/admin-dashboard/users', label: 'Users'}
  ];
  loggedInLinks = [
    { url: '/entries/post', label: 'Posts' },
    { url: '/entries/note', label: 'Notes' },
    { url: '/entries/announcement', label: 'Announcements' },
    { url: '/chat', label: 'Chat', badge: this.chatService.unreadCount$ },
  ];
  notLoggedInLinks = [
    { url: '/auth/sign-in', label: 'Sign In' },
    { url: '/auth/sign-up', label: 'Sign Up' },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1000px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
    
  currentPath?: string;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private logger: NGXLogger,
    private router: Router,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  signOut(): void {
    this.authService.logout();
    this.chatService.disconnect();
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.links = this.loggedInLinks;
          this.initChat();
          this.chatService.updateUnreadCount();
        } else {
          this.links = this.notLoggedInLinks;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
    this.chatService.disconnect();
  }

  initChat(): void {
    this.chatService.connect();
    this.notificationsSubscription = this.chatService
      .notifications()
      .subscribe((notification: Message) => {
        if (this.router.url !== '/chat') {
          this.displayNotification();
          this.chatService.updateUnreadCount();
        }
      });
  }

  displayNotification() {
    const snackBarRef = this.snackBar.open(
      this.translateService.instant('You have a new message!'),
      this.translateService.instant('Go to chat'),
      {
        duration: 7000,
        verticalPosition: 'top',
        horizontalPosition: 'left',
      });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/chat']);
    });
  }
}
