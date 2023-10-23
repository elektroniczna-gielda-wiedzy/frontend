import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { AuthService, Language } from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';


function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}



@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})



export class PasswordChangeComponent {
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;

  unauthorize = false;
  passwordForm = this.fb.group({
    password: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        matchValidator('confirmPassword', true),
      ],
    ],
    repeatNewPassword: ['', [Validators.required, matchValidator('newPassword')]],
  });

  hidePassword = true;
  hideNewPassword = true;
  hideRepeatNewPassword = true;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  ngOnDestroy() {
    this.langChangeSubscription?.unsubscribe();
  }

  initLanguage() {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  
  
  onSubmit(){
      console.log("Change password!")


  }

}
