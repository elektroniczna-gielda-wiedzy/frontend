import {
  Directive,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, TokenService } from 'src/app/core';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective implements OnInit, OnDestroy {
  private isLoggedInSubscription?: Subscription;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private tokenService: TokenService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn && this.tokenService.isAdmin()) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
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
