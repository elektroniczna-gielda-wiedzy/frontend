import { Component, Input } from '@angular/core';
import { EntryHttpService, TokenService } from 'src/app/core';

@Component({
  selector: 'app-votes-widget',
  templateUrl: './votes-widget.component.html',
  styleUrls: ['./votes-widget.component.scss'],
})
export class VotesWidgetComponent {
  @Input()
  count: number = 0;

  @Input()
  voted: number = 0;

  @Input()
  entryId?: number;

  @Input()
  answerId?: number;

  @Input()
  authorId?: number;

  constructor(
    private entryHttpService: EntryHttpService,
    private tokenService: TokenService
  ) {}

  vote(value: number) {
    if (this.isAuthor || !this.entryId) {
      return;
    }

    if (this.voted === value) {
      value = 0;
    }

    if (this.entryId) {
      this.entryHttpService
        .vote(value, this.entryId, this.answerId)
        .subscribe((res) => {
          if (res.success) {
            this.count += value;
            this.voted = value;
          }
        });
    }
  }

  get isAuthor() {
    return this.authorId === this.tokenService.getUserId();
  }
}
