import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { MaterialModule } from './material-module';
import { CategoriesListItemComponent } from './components/categories-list-item/categories-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesListItemComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ]
})
export class AdminModule { }
