import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { EmailHttpService, getEmailValidators } from 'src/app/core';

@Component({
  selector: 'app-email-link',
  templateUrl: './email-link.component.html',
  styleUrls: ['./email-link.component.scss']
})


export class EmailLinkComponent {

  unauthorize = false;
  errorMessage = '';
  loading = false;
  
  emailForm = this.fb.group({
    email: ['', getEmailValidators()]
  });

  constructor(
      private logger: NGXLogger,
      private readonly route: ActivatedRoute,
      private router: Router,
      private translateService : TranslateService,
      private fb: FormBuilder,
      private emailService: EmailHttpService,
      private snackBar: MatSnackBar )
    {}


    onSubmit(form: FormGroup) {
      if (form == this.emailForm){
 
        const email = this.emailForm.get('email')?.value;
        if (!email || this.emailForm.get('email')?.invalid) {
          return;
        }
        this.loading = true;
        this.emailService.remindPassword(email).subscribe(
          { next: (response) => {
            this.loading = false;
            this.router.navigate(['/auth/sign-in']);
            if (response.success) {
              this.displayMessage('--password-change-msg');
       
            }
          }
          ,
        error: (err) => {
          this.loading = false;
          this.logger.info('resent email failed');
          this.logger.error(err);
          const msgs = err?.error?.messages || [];
          const msg = msgs.join(' ').toLowerCase();
          if (msg.includes('does not exist')) {
            this.errorMessage = '--email-not-found-msg'
            this.displayMessage(this.errorMessage);
          }
        },
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

  
}