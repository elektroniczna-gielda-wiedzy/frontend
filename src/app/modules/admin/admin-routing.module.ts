import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from '../categories/components/categories-list/categories-list.component';
import { adminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  // { path: 'categories', component: CategoriesListComponent, canActivate: [adminGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
