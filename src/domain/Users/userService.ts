import { apiAdapter } from '../../api/apiAdapter';
import { Page } from '../../types/pages';


import { userAdapter } from './userAdapter';
import { IGetListParams, userApi } from './userApi';
import { User } from './userTypes';

async function getUser(userId: number): Promise<User> {
  const userAPI = await userApi.getUser(userId);
  return userAdapter.toUser(userAPI);
}

async function getList(params: IGetListParams): Promise<Page<User>> {
  const userPageAPI = await userApi.getList(params);
  return apiAdapter.toPageModel(userPageAPI, userAdapter.toUser);
}

export const userService = {
  getUser,
  getList,
};
