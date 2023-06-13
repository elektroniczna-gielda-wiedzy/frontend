import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entry, Language, CategoryService, Category, EntryType, Answer, EntryHttpService } from 'src/app/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent {
  @Input() answers!: Answer[];
  @Input() entry!: Entry;
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  selectedFile: File | undefined;

  form: FormGroup = this.fb.group({
    answer: [null, [Validators.required]],
    image: [null ]
  });
  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,    
    private readonly route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
   console.log(this.answers);
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );

   console.log( this.route.snapshot.paramMap.get('id')!)
    
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  createAnswer(){
    console.log(this.form.value)
    console.log(this.entry);

    this.answers.push( {
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
      image: this.form.value.image
  });
   this.form.reset()
   this.selectedFile = undefined;
   console.log(this.answers)
  }

}
  

