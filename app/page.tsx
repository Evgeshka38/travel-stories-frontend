import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import css from './HomePage.module.css';
import HomePageClient from '@/components/pages/HomePageClient/HomePageClient';
import {
  getPopularStoriesServer,
  getUsersServer,
} from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Головна - Подорожники',
  openGraph: {
    title: 'Головна - Подорожники',
  },
};

export default async function HomePage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient
      .query({
        queryKey: ['travellers', 'home', 1, 4],
        queryFn: () => getUsersServer(1, 4),
      })
      .catch(() => undefined),

    queryClient
      .query({
        queryKey: ['popularStories', 1, 4],
        queryFn: () => getPopularStoriesServer(1, 4),
      })
      .catch(() => undefined),
  ]);

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomePageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}