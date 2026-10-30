'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getOwnStories } from '@/lib/api/clientApi';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import Loader from '@/components/common/Loader/Loader';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';
import css from './OwnStoriesPageClient.module.css';

export default function OwnStoriesPageClient() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['ownStories'],
    queryFn: ({ pageParam }) => getOwnStories(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  if (isLoading) return <Loader />;

  if (isError) return <p>Не вдалося завантажити історії</p>;

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  if (stories.length === 0) {
  return (
    <MessageNoStories
      text="Ви ще нічого не публікували, поділіться своєю першою історією!"
      buttonText="Опублікувати історію"
      href="/stories/create"
    />
  );
};

  return (
    <div className={css.container}>
      <TravellersStories
        stories={stories}
        variant="edit"
        queryKey={['ownStories']}
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
