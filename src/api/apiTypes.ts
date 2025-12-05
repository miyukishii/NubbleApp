export interface MetadaPageAPI {
  total : number;
  per_page : number;
  current_page : number;
  last_page : number;
  first_page : number;
  first_page_url :string;
  last_page_url : string;
  next_page_url : string | null;
  previous_page_url : string | null;
}

/**
 * @description This interface is used to standardize the return os the API.
 * @template Data page data type
*/
export interface PageAPI<Data> {
  meta: MetadaPageAPI;
  data: Data[];
}

export interface PageParams {
  page: number;
  per_page: number;
}

export interface Details {
  message: string;
  status?: number;
}
