import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AnswerHttpService} from 'src/app/core';

@Component({
  selector: 'app-answer-action-buttons',
  templateUrl: './answer-action-buttons.component.html',
  styleUrls: ['./answer-action-buttons.component.scss']
})
export class AnswerActionButtonsComponent {
  @Input() answerId!: number;
  @Input() entryId!: number;
  
  @Output() answerDeleted = new EventEmitter<number>();
  constructor(
    private router: Router,
    private logger: NGXLogger,
    private AnswerHttpService: AnswerHttpService,
  ) { }


  editAnswer() {
   
  }

  deleteAnswer() {
    this.AnswerHttpService.deleteAnswer(this.entryId , this.answerId).subscribe((res) => {
      if (res.success) {
        this.logger.info('Answer deleted');
        this.answerDeleted.emit(this.answerId);
      }
    });


    // this.router.navigate();
    location.reload();
  }
}
