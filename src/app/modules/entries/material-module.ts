import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
    declarations: [
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        MatChipsModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatGridListModule,
        MatDialogModule
    ]
})
export class MaterialModule { }