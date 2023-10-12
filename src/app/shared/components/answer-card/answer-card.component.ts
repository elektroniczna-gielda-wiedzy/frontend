import { Component, EventEmitter, Input, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Language,
  Answer,
  ImageService,
  AnswerHttpService,
  AnswerRequest,
} from 'src/app/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenImageDialogComponent } from '../fullscreen-image-dialog/fullscreen-image-dialog.component';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnDestroy {
  @Input()
  entryId!: number;
  @Input()
  answers?: Answer[] = [];
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  selectedFile: File | undefined;
  base64File?: string;
  imageError!: string;
  isImageSaved: boolean = false;
  cardImageBase64: string | null | undefined;
  @Output() answerDeleted = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    answer: [null, [Validators.required]],
    image: [null],
  });
  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private logger: NGXLogger,
    private im: ImageService,
    private dialog: MatDialog,
    private answerService: AnswerHttpService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && this.answers) {
      this.loadImages();
    }
  }

  loadImage(answer: Answer) {
    if (!answer.image) return;
    this.im.getImage(answer?.image).then((res) => {
      answer.imageSrc = res;
    });
  }

  loadImages() {
    this.answers?.forEach((answer) => {
      this.loadImage(answer);
    });
  }

  ngOnInit(): void {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any): void {
    const max_size = 20971520;
    const allowed_types = ['image/png', 'image/jpeg'];
    const max_height = 15200;
    const max_width = 25600;
    this.selectedFile = event.target.files[0] ?? null;

    if (event.target.files[0].size > max_size) {
      this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
    }
    var fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      const imgBase64Path = e.target.result;
      this.cardImageBase64 = imgBase64Path.substring(
        imgBase64Path.indexOf(',') + 1
      );
      this.isImageSaved = true;
    };

    fileReader.readAsDataURL(event.target.files[0]);
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.form.value.image = null;
  }

  createAnswer() {
    if (this.form.invalid || !this.entryId) {
      return;
    }
    const answer: AnswerRequest = {
      content: this.form.value.answer,
    };
    if (this.isImageSaved && this.cardImageBase64) {
      answer.image = this.cardImageBase64;
    }

    this.answerService.addAnswer(this.entryId, answer).subscribe({
      next: (res) => {
        this.logger.trace(res);
        if (res.success && res.result?.length > 0) {
          this.answers?.push(res.result[0]);
          this.loadImage(res.result[0]);
          this.form.reset();
          this.selectedFile = undefined;
          this.isImageSaved = false;
          
          Object.values(this.form.controls).forEach(control => {
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


  propagateDeletion(id: number) {
    this.answerDeleted.emit(id);
  
    
  } 
}
