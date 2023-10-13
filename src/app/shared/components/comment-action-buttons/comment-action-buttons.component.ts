import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
//import {  CommentHttpService ,Comment}  from 'src/app/core';
import { AnswerEditPopupComponent } from '../answer-edit-popup/answer-edit-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentHttpService } from 'src/app/core/http/comment-http.service';
import { Comment } from 'src/app/core/models/comment';
@Component({
  selector: 'app-comment-action-buttons',
  templateUrl: './comment-action-buttons.component.html',
  styleUrls: ['./comment-action-buttons.component.scss']
})
export class CommentActionButtonsComponent {
  @Input() commentId!: number;
  @Input() comment!: Comment;
  @Input() answerId!: number;
  @Input() entryId!: number;
  
  @Output() commentDeleted = new EventEmitter<number>();
  
  
  
  constructor(
    private router: Router,
    private logger: NGXLogger,
    private commentHttpService: CommentHttpService,
    public dialog: MatDialog
  ) { }


  editComment() {
    const dialogRef = this.dialog.open(AnswerEditPopupComponent, {
      data: this.comment.content,
      height: '300px',
      width: '600px',
      panelClass: 'comment-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined){
        this.comment.content = result



        this.commentHttpService.updateComment(this.entryId , this.answerId , this.commentId , this.comment).subscribe((res) => {
          if (res.success) {
            this.logger.info('comment updated');
            console.log(res.result)
          }
        });
    
        console.log('The dialog was closed');
      }
     
    });
   }

  deleteComment() {
    console.log(this.entryId ,this.answerId , this.commentId)
    this.commentHttpService.deleteComment(this.entryId ,this.answerId , this.commentId).subscribe((res) => {
      console.log(res)
      if (res.success) {
        this.logger.info('comment deleted');
        this.commentDeleted.emit(this.commentId);
      }
    });

   // location.reload();
   }
}
