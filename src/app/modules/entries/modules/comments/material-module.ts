import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatExpansionModule,
        MatDividerModule,
    ]
})
export class MaterialModule { }