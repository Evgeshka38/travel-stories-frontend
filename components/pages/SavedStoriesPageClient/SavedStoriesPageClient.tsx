'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import { getSavedStories } from '@/lib/api/clientApi';
import css from './SavedStoriesPageClient.module.css';

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
        <p>Завантаження збережених історій...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        <p>Не вдалося завантажити збережені історії.</p>
      </div>
    );
  }

  const stories = data.pages.flatMap((page) => page.stories);

  if (stories.length === 0) {
    return (
      <div className={css.container}>
        <p>У вас поки немає збережених історій.</p>
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
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження...' : 'Завантажити ще'}
        </button>
      )}
    </div>
  );
}
