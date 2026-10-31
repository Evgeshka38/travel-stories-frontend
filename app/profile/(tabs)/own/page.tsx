import OwnStoriesPageClient from '@/components/pages/OwnStoriesPageClient/OwnStoriesPageClient';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getOwnStoriesServer } from '@/lib/api/serverApi';
import css from './OwnStoriesPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мої історії - Подорожники',
  openGraph: {
    title: 'Мої історії - Подорожники',
  },
};

export default async function OwnStoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['ownStories'],
    queryFn: ({ pageParam }) => getOwnStoriesServer(pageParam, 12),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
    pages: 1,
  });

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <OwnStoriesPageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}
