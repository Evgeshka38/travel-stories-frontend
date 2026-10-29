import { GetPopularStoriesResponse } from '../types/stories';
import { nextApi } from './api';
import { Story } from '@/lib/types/stories';

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

export interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  description: string;
}

interface UsersResponse {
  status: number;
  message: string;
  data: {
    users: Traveller[];
    total: number;
  };
}

export interface OwnStoriesData {
  stories: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  hasNextPage: boolean;
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

export async function getUsers(
  page = 1,
  limit = 4,
): Promise<Traveller[]> {
  const { data } = await nextApi.get<UsersResponse>('/users', {
    params: { page, limit },
  });

  return data.data.users;
}

export async function logout(): Promise<void> {
  await nextApi.post('/auth/logout');
}

export async function getOwnStories(
  page = 1,
  perPage = 12,
): Promise<OwnStoriesData> {
  const { data } = await nextApi.get('/stories/own', {
    params: { page, perPage },
  });

  return data.data;
}

export async function getPopularStories(
  page = 1,
  perPage = 3,
): Promise<GetPopularStoriesResponse> {
  const { data } = await nextApi.get<GetPopularStoriesResponse>(
    '/stories/popular',
    {
      params: {
        page,
        perPage,
      },
    },
  );

  return data;
}

export async function getStories(
  page = 1,
  perPage = 9,
  category?: string | null,
): Promise<GetPopularStoriesResponse> {
  const { data } = await nextApi.get<GetPopularStoriesResponse>('/stories', {
    params: {
      page,
      perPage,
      ...(category ? { category } : {}),
    },
  });

  return data;
}

export async function getTravellerProfile(travellerId: string, page = 1, limit = 6) {
  const { data } = await nextApi.get(`/users/${travellerId}`, {
    params: { page, limit },
  });
  return data.data; 
}