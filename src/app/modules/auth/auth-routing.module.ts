import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { notAuthGuard } from 'src/app/core';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [notAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [notAuthGuard] },
  { path: 'password-reset', component: PasswordResetComponent, canActivate: [notAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
