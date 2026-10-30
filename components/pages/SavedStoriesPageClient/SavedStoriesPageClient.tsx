'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';
import { getSavedStories } from '@/lib/api/clientApi';
import css from './SavedStoriesPageClient.module.css';
import Link from 'next/link';
import Loader from '@/components/common/Loader/Loader';

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
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        <p className={css.message}>
          Не вдалося завантажити збережені історії.
        </p>
      </div>
    );
  }

  const stories = data.pages.flatMap((page) => page.stories);

  if (stories.length === 0) {
    return (
      <div className={css.container}>
        <MessageNoStories />
      </div>
    );
  }

  return (
    <div className={css.container}>
      <TravellersStories
        stories={stories}
        variant="save"
        queryKey={['savedStories']}
      />

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