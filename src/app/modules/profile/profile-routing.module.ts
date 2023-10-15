import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEntryListComponent } from './components/profile-entry-list/profile-entry-list.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';

const routes: Routes = [
  {
    path: 'entries',
    component: ProfileEntryListComponent,
    data: { page: 'entries' },
  },
  {
    path: 'favorites',
    component: ProfileEntryListComponent,
    data: { page: 'favorites' },
  },
  {
    path: 'details',
    component: ProfileDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
