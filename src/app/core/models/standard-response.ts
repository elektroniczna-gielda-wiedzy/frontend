export interface StandardResponse<T> {
  success: boolean;
  messages: string[];
  result: T[];
  result_info?: ResultInfo;
}

export interface ResultInfo {
  count: number;
  page: number;
  per_page: number;
  total_count: number;
}
