import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_RESULT_INFO } from 'src/app/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  hidePageSize = false;
  showFirstLastButtons = true;
  @Input()
  pageIndex = DEFAULT_RESULT_INFO.page - 1;
  @Input()
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;
  @Input()
  pageSize = DEFAULT_RESULT_INFO.per_page;
  @Input()
  length: number = DEFAULT_RESULT_INFO.total_count;
  @Output()
  onPageChange: EventEmitter<PageEvent> = new EventEmitter();

  handlePageEvent(event: PageEvent) {
    event.pageIndex = event.pageIndex + 1;
    this.onPageChange.emit(event);
  }
}
