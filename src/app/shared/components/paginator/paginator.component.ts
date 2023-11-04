import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  hidePageSize = false;
  showFirstLastButtons = true;
  pageIndex = 0;
  
  @Input()
  pageSizeOptions = [5, 10, 25];
  @Input()
  pageSize = 10;
  @Input()
  length: number = 0;
  @Output()
  onPageChange: EventEmitter<PageEvent> = new EventEmitter();

  handlePageEvent(event: PageEvent) {
    event.pageIndex = event.pageIndex + 1;
    this.onPageChange.emit(event);
  }
}
