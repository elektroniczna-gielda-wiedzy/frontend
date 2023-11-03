import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ReportHttpService } from 'src/app/core';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
})
export class ReportModalComponent {
  reportForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReportModalComponent>,
    private fb: FormBuilder,
    private reportHttpService: ReportHttpService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { entryId: number }
  ) {
    this.reportForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createReport(): void {
    if (this.reportForm.invalid) {
      return;
    }

    const reportData = this.reportForm.value;
    reportData.entry_id = this.data.entryId;
    this.reportHttpService.createReport(reportData).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open(
            this.translateService.instant('--report-success-msg'),
            this.translateService.instant('Close'),
            {
              duration: 5000,
              verticalPosition: 'top',
            }
          );
          this.dialogRef.close();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPlaceholder(key: string): string {
    return this.translateService.instant(`--report-${key}-placeholder`);
  }
}
