import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entry, Language, CategoryService, Category, EntryType, Answer, EntryHttpService } from 'src/app/core';
import { ANSWERS } from 'src/app/core/mocks/answers';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent {
  @Input() answers!: Answer[];
 
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  selectedFile: File | undefined;

 
  constructor(
    private languageService: LanguageService
  ) {}


  ngOnInit(): void {
   console.log(this.answers);
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
    this.selectedFile = event.target.files[0] ?? null;
  }
}
  

