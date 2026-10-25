
import { nextApi } from './api';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export interface CurrentUser {
  _id: string;
  name: string;
  avatarUrl?: string;
  description?: string;
  articlesAmount?: number;
}

export async function register(
  registerData: RegisterRequest,
): Promise<void> {
  await nextApi.post('/auth/register', registerData);
}

export async function login(loginData: LoginRequest): Promise<void> {
  await nextApi.post('/auth/login', loginData);
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const { data } = await nextApi.get('/auth/me', {
    baseURL: '/api',
  });

  return data.data;
}