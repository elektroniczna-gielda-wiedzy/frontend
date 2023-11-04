import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from './components/entry-card/entry-card.component';
import { MaterialModule } from './material-module';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IsLoggedInDirective } from './directives/is-logged-in.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { FullscreenImageDialogComponent } from './components/fullscreen-image-dialog/fullscreen-image-dialog.component';
import { EntryActionButtonsComponent } from './components/entry-action-buttons/entry-action-buttons.component';
import { IfAuthorOrAdminDirective } from './directives/if-author-or-admin.directive';
import { VotesWidgetComponent } from './components/votes-widget/votes-widget.component';
import { IsAdminDirective } from './directives/is-admin.directive';

import { MatDialogModule } from '@angular/material/dialog';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { UserStatusIconComponent } from './components/user-status-icon/user-status-icon.component';
import { ReportModalComponent } from './components/report-modal/report-modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './components/paginator/custom-paginator';

const components = [
  EntryCardComponent,
  FavoriteIconComponent,
  CategorySelectorComponent,
  FullscreenImageDialogComponent,
  EntryActionButtonsComponent,
  VotesWidgetComponent,
  UserStatusIconComponent,
  ReportModalComponent,
  PaginatorComponent,
]

const pipes = [
  RelativeTimePipe,
  FormatTimePipe,
]

const directives = [
  IsLoggedInDirective,
  IfAuthorOrAdminDirective,
  IsAdminDirective,
]

@NgModule({
  declarations: [
    ...components,
    ...pipes,
    ...directives,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...components,
    ...pipes,
    ...directives,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl, deps: [TranslateService] }
  ],
})
export class SharedModule {}
