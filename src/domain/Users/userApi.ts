import { PageAPI, PageParams } from 'src/api/apiTypes';

import { api } from '../../api/apiConfig';

import { UserAPI } from './userTypes';

export const USERS_PATH = 'users';

async function getUser(userId: number): Promise<UserAPI> {
  const response = await api.get<UserAPI>(
    `${USERS_PATH}/${userId}`,
  );
  return response.data;
}

export interface IGetListParams {
  pageParams: PageParams,
  search: string;
}

async function getList({ pageParams, search }: IGetListParams): Promise<PageAPI<UserAPI>> {
  const response = await api.get<PageAPI<UserAPI>>(
    USERS_PATH,
    { params: {
      ...pageParams,
      search,
    } }
  );
  return response.data;
}
export const userApi = {
  getUser,
  getList,
};
