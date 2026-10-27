'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedStories } from '@/lib/api/clientApi';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './SavedStoriesPageClient.module.css';

export default function SavedStoriesPageClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['savedStories', 1, 12],
    queryFn: () => getSavedStories(1, 12),
  });

  if (isLoading) {
    return (
      <div className={css.container}>Завантаження збережених історій...</div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        Не вдалося завантажити збережені історії.
      </div>
    );
  }

  return (
    <div className={css.container}>
      <TravellersStories stories={data?.data.stories ?? []} />
    </div>
  );
}
