
import { MetaDataPage, Page } from '../types/pages';
import { MetadaPageAPI, PageAPI } from './apiTypes';

function toMetaDataPage(meta: MetadaPageAPI): MetaDataPage {
  return {
    total: meta.total,
    perPage: meta.per_page,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    firstPage: meta.first_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.last_page_url,
  };
}

function toPageModel<ApiType, ModelType>(page:PageAPI<ApiType>, adapter: (api: ApiType) => ModelType): Page<ModelType> {
  return {
    data: page.data.map(adapter),
    meta: toMetaDataPage(page.meta),
  };
}

export const apiAdapter = {
  toMetaDataPage,
  toPageModel,
};
