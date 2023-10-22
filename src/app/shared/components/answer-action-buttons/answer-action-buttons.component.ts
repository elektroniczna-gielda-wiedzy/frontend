import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Answer, AnswerHttpService, AnswerRequest} from 'src/app/core';
import { AnswerEditPopupComponent } from '../answer-edit-popup/answer-edit-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-answer-action-buttons',
  templateUrl: './answer-action-buttons.component.html',
  styleUrls: ['./answer-action-buttons.component.scss']
})
export class AnswerActionButtonsComponent {
  @Input() answerId!: number;
  @Input() answer!: Answer;
  
  @Input() entryId!: number;
  
  @Output() answerDeleted = new EventEmitter<number>();
  constructor(
    private router: Router,
    private logger: NGXLogger,
    private AnswerHttpService: AnswerHttpService,
    public dialog: MatDialog
  ) { }


  editAnswer() {
    const dialogRef = this.dialog.open(AnswerEditPopupComponent, {
      data: this.answer.content,
      height: '300px',
      width: '600px',
      panelClass: 'answer-dialog'
    });

    dialogRef.afterClosed().subscribe(editedContent => {
      this.logger.trace(editedContent);
      if (editedContent != undefined){
        const answerRequest: AnswerRequest = {
          content: editedContent
        }

        this.AnswerHttpService.updateAnswer(this.entryId , this.answerId , answerRequest).subscribe((res) => {
          if (res.success) {
            this.logger.info('Answer updated');
            this.logger.trace(res.result)
            this.answer.content = editedContent
          }
        });
    
        this.logger.trace('The dialog was closed');
      }
     
    });
  }

  deleteAnswer() {
    this.AnswerHttpService.deleteAnswer(this.entryId , this.answerId).subscribe((res) => {
      if (res.success) {
        this.logger.info('Answer deleted');
        this.answerDeleted.emit(this.answerId);
      }
    });
  }
}
