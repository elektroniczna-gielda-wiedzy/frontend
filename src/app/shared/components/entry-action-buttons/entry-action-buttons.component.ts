import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { EntryHttpService, EntryType } from 'src/app/core';

@Component({
  selector: 'app-entry-action-buttons',
  templateUrl: './entry-action-buttons.component.html',
  styleUrls: ['./entry-action-buttons.component.scss']
})
export class EntryActionButtonsComponent {
  @Input() entryId!: number;
  @Input() entryType!: EntryType;
  @Output() entryDeleted = new EventEmitter<number>();
  constructor(
    private router: Router,
    private logger: NGXLogger,
    private entryHttpService: EntryHttpService,
  ) { }


  editEntry() {
    this.router.navigate([
      'entries',
      EntryType[this.entryType].toLowerCase(),
      this.entryId,
      'edit',
    ]);
  }

  deleteEntry() {
    this.entryHttpService.deleteEntry(this.entryId).subscribe((res) => {
      if (res.success) {
        this.logger.info('Entry deleted');
        this.entryDeleted.emit(this.entryId);
      }
    });
  }
}
