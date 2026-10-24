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
export async function register(registerData: RegisterRequest): Promise<void> {
  await nextApi.post('/auth/register', registerData);
}
export async function login(loginData: LoginRequest): Promise<void> {
  await nextApi.post('/auth/login', loginData);
}
