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
export interface CreateStoryRequest {
  title: string;
  category: string;
  article: string;
  cover: File;
}

export interface CreatedStory {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string;
  ownerId: string;
  date: string;
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
export async function createStory(
  storyData: CreateStoryRequest,
): Promise<CreatedStory> {
  const formData = new FormData();

  formData.append('cover', storyData.cover);
  formData.append('title', storyData.title);
  formData.append('category', storyData.category);
  formData.append('article', storyData.article);

  const { data } = await nextApi.post('/stories', formData);

  return data.data;
}

export async function getAllUsers() {
  const { data } = await nextApi.get('/users');
  return data.data.users;
}