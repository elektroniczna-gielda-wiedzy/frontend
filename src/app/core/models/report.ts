export interface ReportRequest {
  topic: string;
  description: string;
  entry_id: number;
}

export interface Report {
  report_id: number;
  entry_id: number;
  topic: string;
  description: string;
  reporter_id?: number;
  created_at?: string;
  reviewed?: boolean;
}
