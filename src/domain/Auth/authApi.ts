import { AxiosRequestConfig } from 'axios';

import { api } from '../../api/apiConfig';

import { AuthCredentialsAPI, CheckEmail, CheckUsername, FieldAvailableAPI, ForgotPasswordAPI, ForgotPasswordData, RefreshTokenData, SignInData, SignUpData } from './authTypes';

const PATH = 'auth';
const REFRESH_PATH = `${PATH}/refresh-token`;

async function login(loginData: SignInData): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>(
    `${PATH}/login`,
    loginData
  );
  return response.data;
}

async function signOut(): Promise<string> {
  const response = await api.get<string>(
    `${PATH}/profile/logout`,
  );
  return response.data;
}

async function register(data: SignUpData): Promise<void> {
  const response = await api.post<void>(
    `${PATH}/register`,
    data
  );
  return response.data;
}

async function isUserNameAvailable(params: CheckUsername): Promise<FieldAvailableAPI> {
  const response = await api.get<FieldAvailableAPI>(
    `${PATH}/validate-username`,
    { params }
  );
  return response.data;
}

async function isEmailAvailable(params: CheckEmail): Promise<FieldAvailableAPI> {
  const response = await api.get<FieldAvailableAPI>(
    `${PATH}/validate-email`,
    { params }
  );
  return response.data;
}

async function forgotPassword(params: ForgotPasswordData): Promise<ForgotPasswordAPI> {
  const response = await api.post<ForgotPasswordAPI>(
    `${PATH}/forgot-password`,
    params
  );
  return response.data;
}

async function refreshToken(data: RefreshTokenData): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>(
    REFRESH_PATH,
    data
  );
  return response.data;
}

function isRefreshTokenRequest(request: AxiosRequestConfig): boolean {
  const url = request.url;
  return url === REFRESH_PATH;
}

export const authApi = {
  login,
  signOut,
  register,
  isUserNameAvailable,
  isEmailAvailable,
  forgotPassword,
  refreshToken,
  isRefreshTokenRequest,
};
