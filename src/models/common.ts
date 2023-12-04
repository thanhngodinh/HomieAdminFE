export interface BaseResponse<T> {
  data?: T;
  total?: number;
  message?: string;
  status?: string;
}

export interface CallBackParam<T> {
  data: T;
  callback?: any;
}

export interface PageFilter {
  pageSize?: number;
  pageIdx?: number;
  sort?: string;
}
