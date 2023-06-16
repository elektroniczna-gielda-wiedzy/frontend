import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private isLoggedInSubscription?: Subscription;
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

  constructor(private authService: AuthService) {}

  signOut(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          this.links = this.loggedInLinks;
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
  }
}
