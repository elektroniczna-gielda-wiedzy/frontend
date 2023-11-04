import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = '';
  override nextPageLabel = '';
  override previousPageLabel = '';
  override firstPageLabel = '';
  override lastPageLabel = '';
  override getRangeLabel = this.getTranslatedRangeLabel;

  constructor(private translate: TranslateService) {
    super();
    this.translate.onLangChange.subscribe(() => {
      this.updateLabels();
    });
    this.updateLabels();
  }

  private updateLabels() {
    this.itemsPerPageLabel = this.translate.instant(
      '--mat-paginator.itemsPerPage'
    );
    this.nextPageLabel = this.translate.instant('--mat-paginator.nextPage');
    this.previousPageLabel = this.translate.instant(
      '--mat-paginator.previousPage'
    );
    this.firstPageLabel = this.translate.instant('--mat-paginator.firstPage');
    this.lastPageLabel = this.translate.instant('--mat-paginator.lastPage');

    this.changes.next();
  }

  private getTranslatedRangeLabel(
    page: number,
    pageSize: number,
    length: number
  ): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('--mat-paginator.getRange.zero', {
        length,
      });
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return this.translate.instant('--mat-paginator.getRange.other', {
      length,
      start: startIndex + 1,
      end: endIndex,
    });
  }
}
