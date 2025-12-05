import { User, UserAPI } from '../Users/userTypes';

export interface AuthCredentials {
  token: string;
  refreshToken: string;
  tokenExpiresAt: string;
  user: User;
}

export interface AuthCredentialsAPI {
  auth: {
    type: string; //'bearer';
    token: string;
    refreshToken: string;
    expires_at: string;
  };
  user: UserAPI;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface FieldAvailableAPI {
  message: string;
  isAvailable?: boolean;
}

export interface CheckUsername {
  username: string;
}

export interface CheckEmail {
  email: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordAPI {
  message: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}
