import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import {
  EmailHttpService,
  getEmailValidators,
} from '../../http/email-http.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss'],
})
export class EmailConfirmComponent {
  resendForm = this.fb.group({
    email: ['', getEmailValidators()],
  });
  loading = true;
  errorMsg = '';

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private emailHttpService: EmailHttpService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private logger: NGXLogger
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (token) {
      this.confirmEmail(token);
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }

  confirmEmail(token: string) {
    this.emailHttpService.confirmEmail(token).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.displayMessage('--email-confirmed-msg');
          this.router.navigate(['/auth/sign-in']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.logger.error(error);
        const msgs = error?.error?.messages || [];
        const msg = msgs.join(' ').toLowerCase();
        if (msg.includes('already confirmed')) {
          this.errorMsg = '--email-confirm-already-confirmed-msg'
        } else if (msg.includes('expired')) {
          this.errorMsg = '--email-confirm-expired-msg'
        } else if (msg.includes('invalid')) {
          this.errorMsg = '--email-confirm-invalid-msg'
        }
      },
    });
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

  resendFormSubmit() {
    if (this.resendForm.invalid) {
      return;
    }
    const email = this.resendForm.get('email')?.value;
    if (!email) {
      return;
    }
    this.resendEmail(email);
  }

  resendEmail(email: string) {
    this.loading = true;
    this.emailHttpService.resendConfirmationEmail(email).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.displayMessage('--verify-email-msg');
          this.router.navigate(['/auth/sign-in']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.logger.error(error);
        const msgs = error?.error?.messages || [];
        const msg = msgs.join(' ').toLowerCase();
        if (msg.includes('does not exist')) {
          this.errorMsg = '--email-not-found-msg'
        }
      },
    });
  }
}
