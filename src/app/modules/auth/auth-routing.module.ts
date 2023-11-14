import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { notAuthGuard } from 'src/app/core';
import { PasswordResetComponent } from '../../core/components/password-reset/password-reset.component';
import { EmailLinkComponent } from './components/email-link/email-link.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [notAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [notAuthGuard] },
  { path: 'email-send', component: EmailLinkComponent, canActivate: [notAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
