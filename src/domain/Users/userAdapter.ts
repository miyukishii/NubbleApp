import { User, UserAPI } from './userTypes';

function toUser(useApi: UserAPI): User {
  return {
    id: useApi.id,
    firstName: useApi.first_name,
    lastName: useApi.last_name,
    username: useApi.username,
    email: useApi.email,
    profileUrl: useApi.profile_url,
    isOnline: useApi.is_online,
    fullName: useApi.full_name,
  };
}

export const userAdapter = {
  toUser,
};
