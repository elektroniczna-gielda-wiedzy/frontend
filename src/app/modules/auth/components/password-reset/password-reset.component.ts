import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { differentValidator, getEmailValidators, matchValidator } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  emailSend = false; 
  hideNewPassword = true;
  hideRepeatNewPassword = true;

  unauthorize = false;
  passwordForm = this.fb.group({
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        matchValidator('repeatNewPassword', true),
        differentValidator('password'),
      ],
    ],
    repeatNewPassword: [
      '',
      [Validators.required, matchValidator('newPassword')],
    ],
  });


  emailForm = this.fb.group({
    email: ['', getEmailValidators()]
  });

  constructor(
      private router: Router,
      private translateService : TranslateService,
      private fb: FormBuilder)
    {}

  ngOnDestroy() {}

  onSubmit(form: FormGroup) {
    if (form == this.emailForm){
      //TODO
      this.emailSend = true;
    }
    else if (form == this.passwordForm){
      //TODO
    }
    
  }

  getNewPasswordErrorMessage() {
    if (this.passwordForm.controls.newPassword.hasError('required')) {
      return this.translateService.instant('--new-password-required-msg');
    }
    if (this.passwordForm.controls.newPassword.hasError('minlength')) {
      return this.translateService.instant('--password-min-length-msg', {
        length: 6,
      });
    }
    if (this.passwordForm.controls.newPassword.hasError('different')) {
      return this.translateService.instant('--password-different-msg');
    }
    return '';
  }

  getRepeatNewPasswordErrorMessage() {
    if (this.passwordForm.controls.repeatNewPassword.hasError('required')) {
      return this.translateService.instant(
        '--repeat-new-password-required-msg'
      );
    }
    if (this.passwordForm.controls.repeatNewPassword.hasError('matching')) {
      return this.translateService.instant('--repeat-new-password-match-msg');
    }
    return '';
  }
}
