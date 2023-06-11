import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthService, UserSignInCredentials } from 'src/app/core';
import { TokenService } from 'src/app/core';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^[a-z0-9]+[\._]?[a-z0-9]+[@]student[.]agh[.]edu[.]pl$/
        ),
      ],
    ],
    password: ['', Validators.required],
    rememberMe: [false],
  });
  unauthorize = false;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
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
            this.tokenService.setToken(response.result[0].session_token);
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
