import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Language,
  Answer,
  ImageService,
  AnswerHttpService,
  AnswerRequest,
  TokenService,
} from 'src/app/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenImageDialogComponent } from '../fullscreen-image-dialog/fullscreen-image-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnDestroy {
  @Input()
  entryAuthorId?: number;
  @Input()
  entryId!: number;
  answers: Answer[] = [];
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  base64File?: string;
  imageError: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string | null | undefined;
  filename = '';

  form: FormGroup = this.fb.group({
    answer: [null, [Validators.required]],
    image: [null],
  });
  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private logger: NGXLogger,
    private imageService: ImageService,
    private dialog: MatDialog,
    private answerHttpService: AnswerHttpService,
    private cdRef: ChangeDetectorRef,
    private tokenService: TokenService,
    private router: Router
  ) {}

  loadAnswers() {
    if (!this.entryId) {
      return;
    }
    this.answerHttpService.getAnswers(this.entryId).subscribe({
      next: (res) => {
        if (res.success && res.result?.length > 0) {
          this.answers = res.result;
          this.loadImages();
        }
      },
      error: (err) => {
        this.logger.error(err);
      },
    });
  }

  loadImage(answer: Answer) {
    if (!answer.image) return;
    this.imageService.getImage(answer?.image).then((res) => {
      answer.imageSrc = res;
    });
  }

  loadImages() {
    this.answers?.forEach((answer) => {
      this.loadImage(answer);
    });
  }

  initLanguage() {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  ngOnInit(): void {
    this.loadAnswers();
    this.initLanguage();
  }

  ngOnDestroy() {
    this.langChangeSubscription?.unsubscribe();
  }

  onFileSelected(event: any): void {
    this.imageService
      .readImageFile(event)
      .then(({ filename, imgBase64 }) => {
        this.filename = filename;
        this.cardImageBase64 = imgBase64?.substring(imgBase64.indexOf(',') + 1);
        this.isImageSaved = true;
        this.imageError = '';
      })
      .catch((err) => {
        this.logger.error(err);
        this.imageError = err;
      });
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.form.controls['image'].setValue(null);
    this.imageError = '';
  }

  createAnswer() {
    if (this.form.invalid || !this.entryId) {
      return;
    }
    const answer: AnswerRequest = {
      content: this.form.value.answer,
    };
    if (this.isImageSaved && this.cardImageBase64) {
      answer.image = {
        filename: this.filename,
        data: this.cardImageBase64,
      };
    }

    this.answerHttpService.addAnswer(this.entryId, answer).subscribe({
      next: (res) => {
        this.logger.trace(res);
        if (res.success && res.result?.length > 0) {
          this.answers?.push(res.result[0]);
          this.loadImage(res.result[0]);
          this.form.reset();
          this.isImageSaved = false;

          Object.values(this.form.controls).forEach((control) => {
            control.setErrors(null);
          });
        }
      },
      error: (err) => {
        this.logger.error(err);
      },
    });
  }

  openDialog(image?: string): void {
    if (!image) return;
    this.dialog.open(FullscreenImageDialogComponent, {
      data: { image },
      panelClass: 'fullscreen-dialog',
    });
  }

  onAnswerDelete(answerId: number) {
    this.answers = this.answers.filter(
      (answer) => answer.answer_id != answerId
    );
  }

  onChangeTopAnswer({
    answerId,
    isTopAnswer,
  }: {
    answerId: number;
    isTopAnswer: boolean;
  }) {
    if (!this.answers) {
      return;
    }

    if (this.entryId && answerId) {
      this.answerHttpService
        .changeTopAnswer(this.entryId, answerId, isTopAnswer ? -1 : 1)
        .subscribe((res) => {
          if (res.success) {
            this.logger.trace(res);
            this.updateAnswersAfterMarking(answerId);
          }
        });
    }
  }

  updateAnswersAfterMarking(answerId: number) {
    this.answers?.forEach((answer) => {
      if (answer.answer_id != answerId && answer.top_answer) {
        answer.top_answer = false;
      } else if (answer.answer_id == answerId) {
        answer.top_answer = !answer.top_answer;
      }
    });

    this.answers?.sort((a, b) => {
      if (a.top_answer) {
        return -1;
      } else if (b.top_answer) {
        return 1;
      } else {
        return 0;
      }
    });

    this.cdRef.detectChanges();
    const headerElement: HTMLElement | null =
      document.querySelector('#answer-count');

    if (headerElement && !isElementVisible(headerElement)) {
      const el: HTMLElement | null = document.querySelector(
        `#answer-id-${answerId}`
      );
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  canMarkAnswer(authorId: number) {
    const currentUserId = this.tokenService.getUserId();
    if (!currentUserId || this.entryAuthorId !== currentUserId) {
      return false;
    }
    return authorId !== currentUserId;
  }

  userEntries(userId?: number) {
    if (!userId) {
      return;
    }
    if (this.tokenService.isAdmin()) {
      this.router.navigate(['/admin-dashboard', 'users', userId]);
      return;
    }
    this.router.navigate(['/profile', userId, 'entries']);
  }
}

function isElementVisible(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
