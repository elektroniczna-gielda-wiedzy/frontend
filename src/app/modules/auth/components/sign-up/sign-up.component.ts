import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import {
  AuthService,
  UserSignUpCredentials,
  getEmailValidators,
} from 'src/app/core';

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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', getEmailValidators()],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        matchValidator('confirmPassword', true),
      ],
    ],
    repeatPassword: ['', [Validators.required, matchValidator('password')]],
  });
  emailTaken = false;
  hidePassword = true;
  hideRepeatPassword = true;
  loading = false;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  onSubmit() {
    this.loading = true;
    this.authService
      .register(this.signUpForm.value as UserSignUpCredentials)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.emailTaken = false;
          if (response.success) {
            this.logger.info('register successful');
            this.snackBar.open(
              this.translateService.instant('--verify-email-msg'),
              this.translateService.instant('Close'),
              {
                duration: 10000,
                verticalPosition: 'top',
              },
            );
            this.router.navigate(['/auth/sign-in']);
          } else {
            this.logger.info('register failed');
            this.logger.debug(response);
          }
        },
        error: (response) => {
          this.loading = false;
          this.logger.info('register failed');
          this.logger.error(response);

          if (
            response.error.messages.some((message: string) =>
              message.includes('User with given email exists')
            )
          ) {
            this.emailTaken = true;
          }
        },
      });
  }
}
