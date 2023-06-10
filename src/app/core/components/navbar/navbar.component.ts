import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  links = [
    { url: '/entries/post', label: 'Posts' },
    { url: '/entries/note', label: 'Notes' },
    { url: '/entries/announcement', label: 'Announcements' },
    { url: '/auth/sign-in', label: 'Sign In' },
    { url: '/auth/sign-up', label: 'Sign Up' },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 800px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
