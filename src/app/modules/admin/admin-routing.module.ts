import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from '../categories/components/categories-list/categories-list.component';
import { adminGuard } from 'src/app/core/guards/admin.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProfileDetailsComponent } from '../profile/components/profile-details/profile-details.component';

const routes: Routes = [
  // { path: 'categories', component: CategoriesListComponent, canActivate: [adminGuard] },
  { path: 'users', component: UserListComponent, canActivate: [adminGuard] },
  { path: 'users/:id', component: ProfileDetailsComponent, canActivate: [adminGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
