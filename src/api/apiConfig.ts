import axios from 'axios';

import { authService } from '../domain/Auth/authService';
import { AuthCredentials } from '../domain/Auth/authTypes';
import { StatusHTTP } from '../types/infraTypes';

export const BASE_URL = 'http://localhost:3333/';
export const api = axios.create({
  baseURL: BASE_URL,
});

interface Props {
  authCredentials: AuthCredentials | null
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
}

export function registerInterceptor({
  authCredentials,
  saveCredentials,
  removeCredentials,
}: Props) {
  return api.interceptors.response.use(response => response,
    async (responseError) => {
      const status = responseError.response.status;
      if (status === StatusHTTP.UNAUTHORIZED) {

        const failedRequest = responseError.config;
        const isRefreshTokenRequest = authService.isRefreshTokenRequest(failedRequest);

        if (
          !authCredentials?.refreshToken ||
              isRefreshTokenRequest ||
              failedRequest.sent
        ) {
          removeCredentials();
          return Promise.reject(responseError);
        }

        failedRequest.sent = true;

        const newAuthCredentials = await authService.authenticateByRefreshToken({
          refreshToken: authCredentials?.refreshToken,
        });

        saveCredentials(newAuthCredentials);

        // To retry request
        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`;
        return api(failedRequest);
      }

      return Promise.reject(responseError);
    }
  );
}
