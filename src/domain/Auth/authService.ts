import { AxiosRequestConfig } from 'axios';

import { api } from '../../api/apiConfig';

import { authAdapter } from './authAdapter';
import { authApi } from './authApi';
import { AuthCredentials, CheckEmail, CheckUsername, FieldAvailableAPI, ForgotPasswordData, RefreshTokenData, SignInData, SignUpData } from './authTypes';

async function signIn(params: SignInData): Promise<AuthCredentials> {
  const authCredentialsAPI = await authApi.login(params);
  return authAdapter.toAuthCredentials(authCredentialsAPI);
}

async function signOut(): Promise<string> {
  const message = await authApi.signOut();
  return message;
}

async function register(params: SignUpData): Promise<void> {
  await authApi.register(params);
}

async function forgotPassword(params: ForgotPasswordData): Promise<string> {
  const { message } = await authApi.forgotPassword(params);
  return message;
}

async function authenticateByRefreshToken(data: RefreshTokenData): Promise<AuthCredentials> {
  const authCredentialsAPI = await authApi.refreshToken(data);
  return authAdapter.toAuthCredentials(authCredentialsAPI);
}

async function isEmailAvailable(params: CheckEmail): Promise<FieldAvailableAPI> {
  const fieldAvailableAPI = await authApi.isEmailAvailable(params);
  return fieldAvailableAPI;
}

async function isUserNameAvailable(params: CheckUsername): Promise<FieldAvailableAPI> {
  const fieldAvailableAPI = await authApi.isUserNameAvailable(params);
  return fieldAvailableAPI;
}

function updateToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken() {
  api.defaults.headers.common.Authorization = null;
}

function isRefreshTokenRequest(request:AxiosRequestConfig) {
  return authApi.isRefreshTokenRequest(request);
}

export const authService = {
  signIn,
  signOut,
  register,
  forgotPassword,
  updateToken,
  removeToken,
  isEmailAvailable,
  isUserNameAvailable,
  authenticateByRefreshToken,
  isRefreshTokenRequest,
};
