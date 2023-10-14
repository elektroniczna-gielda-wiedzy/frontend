import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
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
