import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { EmailConfirmComponent } from './core/components/email-confirm/email-confirm.component';
import { authGuard, notAuthGuard } from './core';
import { PasswordResetComponent } from './core/components/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'entries',
    loadChildren: () =>
      import('./modules/entries/entries.module').then((m) => m.EntriesModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./modules/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [authGuard],
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  { path: 'email-confirm', component: EmailConfirmComponent, canActivate: [notAuthGuard] },
  { path: 'reset-password', component: PasswordResetComponent, canActivate: [notAuthGuard] },
  { path: '', redirectTo: '/entries/announcement', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
