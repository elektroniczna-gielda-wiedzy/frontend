import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategorySuggestionStepperComponent } from './components/category-suggestion-stepper/category-suggestion-stepper.component';
import { adminGuard, authGuard } from 'src/app/core';

const routes: Routes = [
  { path: '', component: CategoriesListComponent, canActivate: [adminGuard] },
  { path: 'suggest', component: CategorySuggestionStepperComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
