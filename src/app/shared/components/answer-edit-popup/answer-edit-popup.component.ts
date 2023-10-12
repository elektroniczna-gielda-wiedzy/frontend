import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { Language } from 'src/app/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule  } from '@angular/material/dialog'

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
    @Inject(MAT_DIALOG_DATA) public data: string) {}



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
