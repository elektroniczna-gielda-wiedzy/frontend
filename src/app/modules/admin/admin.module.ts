import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailsComponent } from './components/report-details/report-details.component';
import { EntriesModule } from '../entries/entries.module';

@NgModule({
  declarations: [UserListComponent, ReportListComponent, ReportDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EntriesModule
  ],
})
export class AdminModule {}
