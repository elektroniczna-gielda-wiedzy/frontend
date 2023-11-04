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

export const DEFAULT_RESULT_INFO = {
  per_page: 10,
  page: 1,
  count: 0,
  total_count: 0,
};
