import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { AuthService, differentValidator, matchValidator } from 'src/app/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent {
  unauthorize = false;
  passwordForm = this.fb.group({
    password: [
      '',
      [Validators.required, differentValidator('newPassword', true)],
    ],
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

  hidePassword = true;
  hideNewPassword = true;
  hideRepeatNewPassword = true;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnDestroy() {}

  onSubmit() {
    if (
      this.passwordForm.invalid ||
      !this.passwordForm.value.password ||
      !this.passwordForm.value.newPassword
    ) {
      return;
    }

    this.authService
      .changePassword(
        this.passwordForm.value.password,
        this.passwordForm.value.newPassword
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/profile/details']);
          }
        },
        error: (err) => {
          this.logger.error(err);
          const msgs = err?.error?.messages || [];
          const msg = msgs.join(' ').toLowerCase();
          if (msg.includes('old password does not match')) {
            this.unauthorize = true;
          }
        },
      });
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
