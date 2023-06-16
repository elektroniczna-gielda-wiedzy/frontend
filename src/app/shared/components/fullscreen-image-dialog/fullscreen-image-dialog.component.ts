import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fullscreen-image-dialog',
  templateUrl: './fullscreen-image-dialog.component.html',
  styleUrls: ['./fullscreen-image-dialog.component.scss'],
})
export class FullscreenImageDialogComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { image: string }
  ) {}
  isZoomed = false;

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
