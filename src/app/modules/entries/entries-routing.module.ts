import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntryAddComponent } from './components/entry-add/entry-add.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';
import { authGuard, entryTypeGuard } from 'src/app/core';

const routes: Routes = [
  { path: '', redirectTo: 'announcement', pathMatch: 'full' },
  {
    path: ':entryType',
    component: EntryListComponent,
    canActivate: [entryTypeGuard, authGuard],
  },
  {
    path: ':entryType/add',
    component: EntryAddComponent,
    canActivate: [entryTypeGuard, authGuard],
  },
  {
    path: ':entryType/:id',
    component: EntryDetailsComponent,
    canActivate: [entryTypeGuard, authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesRoutingModule {}
