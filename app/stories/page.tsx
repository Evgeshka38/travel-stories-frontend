import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import css from './StoriesPage.module.css';
import StoriesPageClient from '@/components/pages/StoriesPageClient/StoriesPageClient';
import { getCategoriesServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'StoriesPage',
};

export default async function StoriesPage() {
  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: ['categories'],
      queryFn: getCategoriesServer,
      staleTime: 1000 * 60 * 60,
    })
    .catch(() => undefined);

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