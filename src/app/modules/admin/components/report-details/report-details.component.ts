import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReportHttpService,
  Report,
  Author,
  UserHttpService,
} from 'src/app/core';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
})
export class ReportDetailsComponent {
  report?: Report;
  reporter?: Author;

  constructor(
    private reportService: ReportHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private userHttpService: UserHttpService
  ) {}

  ngOnInit(): void {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(idParam)) {
      this.router.navigate(['admin-dashboard', 'reports']);
      return;
    }

    this.fetchReport(idParam);
  }

  fetchReport(reportId: number): void {
    this.reportService.getReport(reportId).subscribe({
      next: (response) => {
        if (response.success) {
          this.report = response.result[0];
          if (!this.report || !this.report.reporter_id) {
            return;
          }
          this.fetchUser(this.report.reporter_id);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchUser(userId: number): void {
    this.userHttpService.getUserInfo(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.reporter = response.result[0];
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  markAsResolved() {
    if (!this.report) {
      return;
    }

    this.reportService
      .markAsResolved(this.report.report_id)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['admin-dashboard', 'reports']);
        }
      });
  }
}
