import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from 'src/app/core/guards/admin.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProfileDetailsComponent } from '../profile/components/profile-details/profile-details.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [adminGuard] },
  { path: 'users/:id', component: ProfileDetailsComponent, canActivate: [adminGuard] },
  { path: 'reports', component: ReportListComponent, canActivate: [adminGuard] },
  { path: 'reports/:id', component: ReportDetailsComponent, canActivate: [adminGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
