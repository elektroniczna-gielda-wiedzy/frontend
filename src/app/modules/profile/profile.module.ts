import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileEntryListComponent } from './components/profile-entry-list/profile-entry-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from './material-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileEntryListComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, MaterialModule, TranslateModule],
})
export class ProfileModule {}
