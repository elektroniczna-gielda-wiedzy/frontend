import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {  Language, Answer } from 'src/app/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent {
  @Input()
  answers?: Answer[] = [];
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  selectedFile: File | undefined;
  base64File?: string;
  imageError!: string;
  isImageSaved: boolean | null | undefined;
  cardImageBase64: string | null | undefined;
 

  form: FormGroup = this.fb.group({
    answer: [null, [Validators.required]],
    image: [null ]
  });
  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,    
    private logger: NGXLogger,
  ) {}


  ngOnInit(): void {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
    this.logger.trace(this.answers)
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
      this.imageError =  'Maximum size allowed is ' + max_size / 1000 + 'Mb';
     }
    var fileReader = new FileReader();
    fileReader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;       
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        this.isImageSaved = true;
    };
   
    fileReader.readAsDataURL(event.target.files[0]);
  }

  removeImage(){
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.form.value.image = null;
  }

 
  createAnswer(){
    this.logger.trace(this.form.value)
    this.answers?.push( {
      answer_id: 1,
      author: {
          user_id: 1,
          first_name: 'Adam',
          last_name: 'Kowalski',
      },
      content: this.form.value.answer,
      created_at: "11:06:2023 21:40",
      top_answer: false,
      votes: 3,
      image: this.cardImageBase64!
  });
   this.form.reset();
   this.selectedFile = undefined;
   this.isImageSaved = null;
   this.logger.trace(this.answers)
  }

  
}
  

