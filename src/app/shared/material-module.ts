import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        MatChipsModule
    ]
})
export class MaterialModule { }