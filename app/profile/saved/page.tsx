import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getSavedStoriesServer } from '@/lib/api/serverApi';
import SavedStoriesPageClient from '@/components/pages/SavedStoriesPageClient/SavedStoriesPageClient';
import css from './SavedStoriesPage.module.css';

export default async function SavedStoriesPage() {
  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: ['savedStories', 1, 12],
      queryFn: () => getSavedStoriesServer(1, 12),
    })
    .catch(() => undefined);

  return (
    <div className={css.page}>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SavedStoriesPageClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}
