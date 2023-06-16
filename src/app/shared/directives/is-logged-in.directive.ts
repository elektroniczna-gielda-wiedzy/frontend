import {
  Directive,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core';

@Directive({
  selector: '[appIsLoggedIn]',
})
export class IsLoggedInDirective implements OnInit, OnDestroy {
  private isLoggedInSubscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
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
