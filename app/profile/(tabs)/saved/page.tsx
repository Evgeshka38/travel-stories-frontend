import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import css from './SavedStoriesPage.module.css';
import SavedStoriesPageClient from '@/components/pages/SavedStoriesPageClient/SavedStoriesPageClient';
import { getSavedStoriesServer } from '@/lib/api/serverApi';
import type { PaginatedStoriesData } from '@/lib/types/stories';

export const metadata: Metadata = {
  title: 'Збережені історії - Подорожники',
  openGraph: {
    title: 'Збережені історії - Подорожники',
  },
};

export default async function SavedStoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['savedStories'],
    queryFn: ({ pageParam }) => getSavedStoriesServer(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedStoriesData) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary
          state={dehydrate(queryClient, {
            shouldDehydrateQuery: (query) => query.state.status === 'success',
          })}
        >
          <SavedStoriesPageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}
