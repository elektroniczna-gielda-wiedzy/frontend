import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportHttpService, Report } from 'src/app/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent {
  reports: Report[] = [];

  constructor(
    private reportService: ReportHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.reportService.getReports().subscribe({
      next: (response) => {
        if (response.success) {
          this.reports = response.result;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openDetails(reportId: number): void {
    this.router.navigate([reportId], {relativeTo: this.route});
  }
}
