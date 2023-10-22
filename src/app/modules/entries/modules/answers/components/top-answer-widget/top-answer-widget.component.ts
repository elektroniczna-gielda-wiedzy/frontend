import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-answer-widget',
  templateUrl: './top-answer-widget.component.html',
  styleUrls: ['./top-answer-widget.component.scss'],
})
export class TopAnswerWidgetComponent {
  @Input()
  isTopAnswer: boolean = false;

  @Input()
  entryId?: number;

  @Input()
  answerId?: number;

  @Output()
  onChangeTopAnswer: EventEmitter<{ answerId: number; isTopAnswer: boolean }> =
    new EventEmitter<{ answerId: number; isTopAnswer: boolean }>();

  changeTopAnswer() {
    if (!this.entryId) {
      return;
    }
    this.onChangeTopAnswer.emit({
      answerId: this.answerId!,
      isTopAnswer: this.isTopAnswer,
    });
  }

  get icon() {
    return this.isTopAnswer ? 'bookmark' : 'bookmark_border';
  }
}
