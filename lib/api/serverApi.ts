import { cookies } from 'next/headers';
import { serverApi } from './api';
import { GetPopularStoriesResponse } from '@/lib/types/stories';

export interface ServerCurrentUser {
  _id: string;
  name: string;
  avatarUrl?: string;
  description?: string;
  articlesAmount?: number;
}

export interface ServerCategory {
  _id: string;
  name: string;
}

export interface ServerTraveller {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  description: string;
}

interface SessionResponse {
  status: number;
  message: string;
  data: ServerCurrentUser | null;
}

interface CategoriesResponse {
  status: number;
  message: string;
  data: ServerCategory[];
}

interface UsersResponse {
  status: number;
  message: string;
  data: {
    users: ServerTraveller[];
    total: number;
  };
}

export async function checkSessionServer(): Promise<ServerCurrentUser | null> {
  const cookieStore = await cookies();

  const { data } = await serverApi.get<SessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.data;
}

export async function getCategoriesServer(): Promise<ServerCategory[]> {
  const { data } = await serverApi.get<CategoriesResponse>('/categories');

  return data.data;
}

export async function getUsersServer(
  page = 1,
  limit = 4,
): Promise<ServerTraveller[]> {
  const { data } = await serverApi.get<UsersResponse>('/users', {
    params: {
      page,
      limit,
    },
  });

  return data.data.users;
}

export async function getPopularStoriesServer(
  page = 1,
  perPage = 3,
): Promise<GetPopularStoriesResponse> {
  const { data } = await serverApi.get<GetPopularStoriesResponse>(
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