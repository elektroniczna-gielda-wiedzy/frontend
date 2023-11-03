import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import {
  AuthService,
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
  unauthorize = false;
  hidePassword = true;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private languageService: LanguageService
  ) {}

  onSubmit() {
    this.authService
      .login(this.signInForm.value as UserSignInCredentials)
      .subscribe({
        next: (response) => {
          this.unauthorize = false;

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
        error: (response) => {
          this.logger.info('login failed');
          this.logger.error(response);
          this.unauthorize = response.status === 401;
        },
      });
  }
}
