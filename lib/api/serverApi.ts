import { serverApi } from './api';
import type { OwnStoriesData } from './clientApi';
import type {
  GetPopularStoriesResponse,
  GetStoryByIdResponse,
  PaginatedStoriesData,
  Story,
  TravellerProfileResponse,
} from '@/lib/types/stories';
import type { getUsersMeResponse } from '@/lib/types/users';

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

interface RefreshSessionResponse {
  status: number;
  message: string;
  data: null;
}

async function getRequestCookieHeader(): Promise<string> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function checkSessionServer(
  cookieHeader?: string,
): Promise<ServerCurrentUser | null> {
  const cookie = cookieHeader ?? (await getRequestCookieHeader());

  const { data } = await serverApi.get<SessionResponse>('/auth/session', {
    headers: cookie ? { Cookie: cookie } : undefined,
  });

  return data.data;
}

export async function refreshSessionServer(
  cookieHeader: string,
): Promise<string[]> {
  const response = await serverApi.post<RefreshSessionResponse>(
    '/auth/refresh',
    undefined,
    {
      headers: {
        Cookie: cookieHeader,
      },
    },
  );

  const setCookie = response.headers['set-cookie'];

  if (!setCookie) {
    return [];
  }

  return Array.isArray(setCookie) ? setCookie : [setCookie];
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
    params: { page, limit },
  });

  return data.data.users;
}

export async function getUsersMe(): Promise<getUsersMeResponse> {
  const cookie = await getRequestCookieHeader();

  const { data } = await serverApi.get<getUsersMeResponse>('/users/me', {
    headers: cookie ? { Cookie: cookie } : undefined,
  });

  return data;
}

export async function getPopularStoriesServer(
  page = 1,
  perPage = 3,
): Promise<GetPopularStoriesResponse> {
  const { data } = await serverApi.get<GetPopularStoriesResponse>(
    '/stories/popular',
    {
      params: { page, perPage },
    },
  );

  return data;
}

export async function getStoriesServer(
  page = 1,
  perPage = 9,
  category?: string | null,
): Promise<GetPopularStoriesResponse> {
  const { data } = await serverApi.get<GetPopularStoriesResponse>('/stories', {
    params: {
      page,
      perPage,
      ...(category ? { category } : {}),
    },
  });

  return data;
}

export async function getStoryByIdServer(storyId: string): Promise<Story> {
  const { data } = await serverApi.get<GetStoryByIdResponse>(
    `/stories/${storyId}`,
  );

  return data.data;
}

export async function getTravellerProfileServer(
  travellerId: string,
  page = 1,
  limit = 6,
): Promise<TravellerProfileResponse> {
  const { data } = await serverApi.get<{
    status: number;
    message: string;
    data: TravellerProfileResponse;
  }>(`/users/${travellerId}`, {
    params: { page, limit },
  });

  return data.data;
}

export async function getOwnStoriesServer(
  page = 1,
  perPage = 12,
): Promise<OwnStoriesData> {
  const cookie = await getRequestCookieHeader();

  const { data } = await serverApi.get<{ data: OwnStoriesData }>(
    '/stories/own',
    {
      params: { page, perPage },
      headers: cookie ? { Cookie: cookie } : undefined,
    },
  );

  return data.data;
}

export async function getSavedStoriesServer(
  page = 1,
  perPage = 12,
): Promise<PaginatedStoriesData> {
  const cookie = await getRequestCookieHeader();

  const { data } = await serverApi.get<{ data: PaginatedStoriesData }>(
    '/stories/saved',
    {
      params: { page, perPage },
      headers: cookie ? { Cookie: cookie } : undefined,
    },
  );

  return data.data;
}
