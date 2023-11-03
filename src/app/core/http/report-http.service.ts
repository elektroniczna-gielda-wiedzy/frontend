import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StandardResponse } from '../models/standard-response';
import { Observable } from 'rxjs';
import { ReportRequest, Report } from '../models/report';
@Injectable({
  providedIn: 'root'
})
export class ReportHttpService {
  private readonly apiUrl = `${environment.apiUrl}/report`;
  constructor(private http: HttpClient) { }

  getReports(): Observable<StandardResponse<Report>> {
    const url = this.apiUrl;
    return this.http.get<StandardResponse<Report>>(url);
  }

  getReport(reportId: number): Observable<StandardResponse<Report>> {
    const url = `${this.apiUrl}/${reportId}`;
    return this.http.get<StandardResponse<Report>>(url);
  }

  createReport(report: ReportRequest): Observable<StandardResponse<Report>> {
    const url = this.apiUrl;
    return this.http.post<StandardResponse<Report>>(url, report);
  }

  markReportAsReviewed(reportId: number): Observable<StandardResponse<Report>> {
    const url = `${this.apiUrl}/${reportId}`;
    return this.http.put<StandardResponse<Report>>(url, {reviewed: 1});
  }
}
