import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StandardResponse } from '../models/standard-response';
import { Observable } from 'rxjs';
import { ReportRequest, Report } from '../models/report';
@Injectable({
  providedIn: 'root',
})
export class ReportHttpService {
  private readonly apiUrl = `${environment.apiUrl}/report`;
  headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient) {}

  getReports(): Observable<StandardResponse<Report>> {
    const url = this.apiUrl;
    return this.http.get<StandardResponse<Report>>(url, {
      headers: this.headers,
    });
  }

  getReport(reportId: number): Observable<StandardResponse<Report>> {
    const url = `${this.apiUrl}/${reportId}`;
    return this.http.get<StandardResponse<Report>>(url, {
      headers: this.headers,
    });
  }

  createReport(report: ReportRequest): Observable<StandardResponse<Report>> {
    const url = this.apiUrl;
    return this.http.post<StandardResponse<Report>>(url, report, {
      headers: this.headers,
    });
  }

  markAsResolved(reportId: number): Observable<StandardResponse<Report>> {
    const url = `${this.apiUrl}/${reportId}`;
    return this.http.put<StandardResponse<Report>>(
      url,
      { reviewed: 1 },
      { headers: this.headers }
    );
  }
}
