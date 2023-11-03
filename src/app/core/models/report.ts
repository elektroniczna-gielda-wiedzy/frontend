export interface ReportRequest {
  topic: string;
  description: string;
  entry_id: number;
}

export interface Report {
  report_id: number;
  topic: string;
  description: string;
  entry_id?: number;
  reporter_id?: number;
}
