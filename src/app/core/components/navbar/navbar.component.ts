import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ChatService } from 'src/app/modules/chat/services/chat.service';
import { NGXLogger } from 'ngx-logger';
import { Message } from '@stomp/stompjs';

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
  links: { url: string; label: string }[] = [];
  profileLinks = [
    { url: '/profile/entries', label: 'My entries' },
    { url: '/profile/favorites', label: 'My favorites' },
    // { url: '/profile/details', label: 'Profile details' },
  ];
  loggedInLinks = [
    { url: '/entries/post', label: 'Posts' },
    { url: '/entries/note', label: 'Notes' },
    { url: '/entries/announcement', label: 'Announcements' },
    { url: '/chat', label: 'Chat' },
  ];
  notLoggedInLinks = [
    { url: '/auth/sign-in', label: 'Sign In' },
    { url: '/auth/sign-up', label: 'Sign Up' },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 800px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private logger: NGXLogger
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
        this.logger.trace('notification', notification.body);
      });
  }
}
