export interface PaginableResult<T> {
  page: number;
  results: T;
  dates?: Record<string, string>;
  total_results: number;
  total_pages: number;
}
