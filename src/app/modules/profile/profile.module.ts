import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEntryListComponent } from './components/profile-entry-list/profile-entry-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileEntryListComponent, ProfileDetailsComponent, PasswordChangeComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ],
})
export class ProfileModule {}
