import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { Language } from 'src/app/core';
import { CommentHttpService } from 'src/app/core/http/comment-http.service';
import { CommentRequest } from 'src/app/core/models/comment';
import { Comment } from 'src/app/core/models/comment';
import { LanguageService } from 'src/app/modules/translate/language.service';
@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss']
})
export class CommentsCardComponent {

  step : number  = 0;
  @Input()
  comments?: Comment[] = [];
  @Input()
  entryId!: number;
  @Input()
  answerId!: number;
  //@Output() commentDeleted = new EventEmitter<number>();
  private commentsSubscription?: Subscription;
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  

  commentForm: FormGroup = this.fb.group({
    comment: [null, [Validators.required]],
    
  });

  
  constructor(
    private fb: FormBuilder,
    private commentService: CommentHttpService,
    private logger:  NGXLogger,
    private languageService: LanguageService,
  ) {}




  
  ngOnInit(): void {
    console.log(this.comments)
    this.comments?.sort((b,a) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    this.step = 0;

    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges){
    
    this.commentService.getComments(this.entryId , this.answerId)
   
  }


  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }


  toggle(){

    this.step = (this.step + 1) %2;
  }

  addComment(){
  
      if (this.commentForm.invalid ) {
        return;
      }
      const comment: CommentRequest = {
        content: this.commentForm.value.comment,
      };
  
      this.commentService.addComment(this.entryId, this.answerId , comment).subscribe({
        next: (res) => {
          this.logger.trace(res);
          if (res.success && res.result?.length > 0) {
            this.comments?.push(res.result[0]);
            this.commentForm.reset();
    
            // Object.values(this.form.controls).forEach(control => {
            //   control.setErrors(null);
            // });
          }
        },
        error: (err) => {
          this.logger.error(err);
        },
      });

  }

  
    commentDeleted(id: number) {
      this.commentsSubscription = this.commentService
          .getComments(this.entryId , this.answerId)
          .subscribe((response) => {
            this.comments = response.result;
          });
     }
 

}
