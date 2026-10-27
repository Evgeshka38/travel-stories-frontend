'use client';

import { useQuery } from '@tanstack/react-query';
import { getOwnStories } from '@/lib/api/clientApi';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './OwnStoriesPageClient.module.css';

export default function OwnStoriesPageClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ownStories', 1, 12],
    queryFn: () => getOwnStories(1, 12),
  });

  if (isLoading) {
    return <div className={css.container}>Завантаження власних історій...</div>;
  }

  if (isError) {
    return (
      <div className={css.container}>
        Не вдалося завантажити власні історії.
      </div>
    );
  }

  return (
    <div className={css.container}>
      <TravellersStories stories={data?.data.stories ?? []} />
    </div>
  );
}
