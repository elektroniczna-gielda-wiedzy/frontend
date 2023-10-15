import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
    ],
    exports: [
        MatTabsModule,
        MatButtonToggleModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class MaterialModule { }