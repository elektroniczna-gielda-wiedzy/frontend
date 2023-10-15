import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoriesListItemComponent } from './components/categories-list-item/categories-list-item.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorySuggestionStepperComponent } from './components/category-suggestion-stepper/category-suggestion-stepper.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesListItemComponent,
    CategoryFormComponent,
    CategorySuggestionStepperComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
