import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { Language } from 'src/app/core';

@Component({
  selector: 'app-answer-edit-popup',
  templateUrl: './answer-edit-popup.component.html',
  styleUrls: ['./answer-edit-popup.component.scss'],
})
export class AnswerEditPopupComponent {
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;

  constructor(
    public dialogRef: MatDialogRef<AnswerEditPopupComponent>,
    private languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
