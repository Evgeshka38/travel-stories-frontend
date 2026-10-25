import { nextApi } from './api';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
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
export interface Category {
  _id: string;
  name: string;
}

export async function register(registerData: RegisterRequest): Promise<void> {
  await nextApi.post('/auth/register', registerData);
}

export async function login(loginData: LoginRequest): Promise<void> {
  await nextApi.post('/auth/login', loginData);
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const { data } = await nextApi.get('/auth/session');

  return data.data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await nextApi.get('/categories');
  return data.data;
}
