import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordResetComponent } from '../../core/components/password-reset/password-reset.component';
import { EmailLinkComponent } from './components/email-link/email-link.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordResetComponent,
    EmailLinkComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule
  ]
})
export class AuthModule { }
