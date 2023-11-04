import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import {
  AuthService,
  EmailHttpService,
  UserSignInCredentials,
  getEmailValidators,
} from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm = this.fb.group({
    email: ['', getEmailValidators()],
    password: ['', Validators.required],
    rememberMe: [false],
  });
  errorMessage = '';
  hidePassword = true;
  loading = false;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private languageService: LanguageService,
    private emailHttpService: EmailHttpService
  ) {}

  onSubmit() {
    this.loading = true;
    this.authService
      .login(this.signInForm.value as UserSignInCredentials)
      .subscribe({
        next: (response) => {
          this.loading = false;
          if (
            response.success &&
            response.result.length > 0 &&
            response.result[0].session_token
          ) {
            this.logger.info('login successful');
            this.router.navigate(['/']);
          } else {
            this.logger.info('login failed');
            this.logger.debug(response);
          }
        },
        error: (err) => {
          this.loading = false;
          this.logger.info('login failed');
          this.logger.error(err);
          const msgs = err?.error?.messages || [];
          const msg = msgs.join(' ').toLowerCase();
          if (
            /user with email = .* does not exist/.test(msg) ||
            msg.includes('bad credentials')
          ) {
            this.errorMessage = '--invalid-credentials-msg';
          } else if (msg.includes('locked')) {
            this.errorMessage = '--account-locked-msg';
          } else if (msg.includes('disabled')) {
            this.errorMessage = '--email-not-auth-msg';
            this.displayResentEmail();
          }
        },
      });
  }

  displayResentEmail() {
    const snackBarRef = this._snackBar.open(
      this.languageService.translate('--resent-email-msg'),
      this.languageService.translate('Resend'),
      {
        duration: 10000,
        verticalPosition: 'top',
      }
    );

    snackBarRef.onAction().subscribe(() => {
      const email = this.signInForm.get('email')?.value;
      if (!email || this.signInForm.get('email')?.invalid) {
        return;
      }
      this.loading = true;

      this.emailHttpService.resendConfirmationEmail(email).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.logger.info('resent email successful');
            this._snackBar.open(
              this.languageService.translate('--verify-email-msg'),
              this.languageService.translate('Close'),
              {
                duration: 10000,
                verticalPosition: 'top',
              }
            );
          }
        },
        error: (err) => {
          this.loading = false;
          this.logger.info('resent email failed');
          this.logger.error(err);
          const msgs = err?.error?.messages || [];
          const msg = msgs.join(' ').toLowerCase();
          if (msg.includes('does not exist')) {
            this.errorMessage = '--email-not-found-msg'
          }
        },
      });
    });
  }
}
