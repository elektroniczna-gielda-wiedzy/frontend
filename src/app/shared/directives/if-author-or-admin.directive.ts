import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenService } from 'src/app/core';

@Directive({
  selector: '[appIfAuthorOrAdmin]',
})
export class IfAuthorOrAdminDirective {
  @Input() set appIfAuthorOrAdmin(authorId: number | undefined | null) {
    if (!authorId) {
      this.viewContainer.clear();
      return;
    }
    this.showIfAuthorOrAdmin(authorId);
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenService: TokenService
  ) {}

  private showIfAuthorOrAdmin(authorId: number): void {
    if (
      this.tokenService.getUserId() === authorId ||
      this.tokenService.isAdmin()
    ) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
