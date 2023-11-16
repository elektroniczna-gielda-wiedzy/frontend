import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, EmailHttpService, differentValidator, getEmailValidators, matchValidator } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  hideNewPassword = true;
  hideRepeatNewPassword = true;
  token = null;
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

  constructor(
      private readonly route: ActivatedRoute,
      private router: Router,
      private translateService : TranslateService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
      private authService: AuthService )
    {


     
    }

  ngOnDestroy() {}


  ngOnInit(){
    this.token = this.route.snapshot.queryParams['token'];

  }
  onSubmit() {

      if (this.token &&  this.passwordForm){
        console.log(this.token)
        if(  !this.passwordForm.value.repeatNewPassword ){
            return;
        }
        console.log(this.passwordForm.value)
        
        this.authService.modifyPassword(this.token, this.passwordForm.value.repeatNewPassword).subscribe(
          { next: (response) => {
            if (response) {
              this.displayMessage('--password-change-msg');
              this.router.navigate(['/auth/sign-in']);
            }
          }
        }
        )

      }

  }
  displayMessage(message: string) {
    this.snackBar.open(
      this.translateService.instant(message),
      this.translateService.instant('Close'),
      {
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      }
    );
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
