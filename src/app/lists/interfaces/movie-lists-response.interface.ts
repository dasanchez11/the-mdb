import { IListDetails } from './list-details-response.interface';

export interface IListResponse {
  page: number;
  results: IListDetails[];
  total_pages: number;
  total_results: number;
}
