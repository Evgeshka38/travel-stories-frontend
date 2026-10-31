import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import css from './StoriesPage.module.css';
import StoriesPageClient from '@/components/pages/StoriesPageClient/StoriesPageClient';
import {
  getCategoriesServer,
  getStoriesServer,
} from '@/lib/api/serverApi';
import type { GetPopularStoriesResponse } from '@/lib/types/stories';

export const metadata: Metadata = {
  title: 'Історії - Подорожники',
  openGraph: {
    title: 'Історії - Подорожники',
  },
};

const PER_PAGE = 9;

export default async function StoriesPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient
      .query({
        queryKey: ['categories'],
        queryFn: getCategoriesServer,
        staleTime: 1000 * 60 * 60,
      })
      .catch(() => undefined),

    queryClient
      .infiniteQuery({
        queryKey: ['stories', null],
        queryFn: ({ pageParam }) =>
          getStoriesServer(pageParam, PER_PAGE, null),
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetPopularStoriesResponse) =>
          lastPage.data.hasNextPage
            ? lastPage.data.page + 1
            : undefined,
      })
      .catch(() => undefined),
  ]);

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <StoriesPageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}