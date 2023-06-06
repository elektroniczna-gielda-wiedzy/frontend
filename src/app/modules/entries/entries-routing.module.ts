import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { entryTypeGuard } from 'src/app/core/guards/entry-type.guard';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntryAddComponent } from './components/entry-add/entry-add.component';
import { EntryDetailsComponent } from './components/entry-details/entry-details.component';

const routes: Routes = [
  { path: '',              redirectTo: 'announcement', pathMatch: 'full' },
  { path: ':entryType',  component: EntryListComponent, canActivate: [entryTypeGuard]},
  { path: ':entryType/add',  component: EntryAddComponent, canActivate: [entryTypeGuard]},
  { path: ':entryType/:id',  component: EntryDetailsComponent, canActivate: [entryTypeGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
