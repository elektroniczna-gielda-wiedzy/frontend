import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEntryListComponent } from './components/profile-entry-list/profile-entry-list.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
