import { nextApi } from './api';

export type Traveller = {
  _id: string;
  name: string;
  avatarUrl: string;
  description: string;
  articlesAmount: number;
};

export type TravellersData = {
  users: Traveller[];
  page: number;
  perPage: number;
  totalItems: number;
  hasNextPage: boolean;
};

export async function getTravellers(
  page: number,
  limit: number,
): Promise<TravellersData> {
  const response = await nextApi.get<{ data: TravellersData }>('/users', {
    params: { page, limit },
  });

  return response.data.data;
}
