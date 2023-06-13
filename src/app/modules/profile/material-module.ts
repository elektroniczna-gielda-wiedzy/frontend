import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [
    ],
    exports: [
        MatTabsModule,
        MatButtonToggleModule
    ]
})
export class MaterialModule { }