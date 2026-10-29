'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import { getSavedStories } from '@/lib/api/clientApi';
import css from './SavedStoriesPageClient.module.css';
import Link from 'next/link';

export default function SavedStoriesPageClient() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['savedStories'],
    queryFn: ({ pageParam }) => getSavedStories(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  if (isPending) {
    return (
      <div className={css.container}>
        <p className={css.message}>Завантаження збережених історій...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        <p className={css.message}>Не вдалося завантажити збережені історії.</p>
      </div>
    );
  }

  const stories = data.pages.flatMap((page) => page.stories);

  if (stories.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.emptyState}>
          <p className={css.message}>
            У вас ще немає збережених історій, мерщій збережіть вашу першу
            історію!
          </p>

          <Link href="/stories" className={css.loadMore}>
            До історій
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={css.container}>
      <TravellersStories stories={stories} variant="save" />

      {hasNextPage && (
        <button
          type="button"
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження...' : 'Завантажити ще'}
        </button>
      )}
    </div>
  );
}
