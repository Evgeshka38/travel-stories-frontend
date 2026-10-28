'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedStories } from '@/lib/api/clientApi';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';
import css from './SavedStoriesPageClient.module.css';

export default function SavedStoriesPageClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['savedStories', 1, 12],
    queryFn: () => getSavedStories(1, 12),
  });

  if (isLoading) {
    return (
      <section className={css.container}>
        <p className={css.message}>Завантаження збережених історій...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={css.container}>
        <p className={css.message}>Не вдалося завантажити збережені історії.</p>
      </section>
    );
  }

  const stories = data?.data.stories ?? [];

  return (
    <section className={css.container}>
      <div className={css.content}>
        {stories.length > 0 ? (
          <TravellersStories stories={stories} />
        ) : (
          <MessageNoStories />
        )}
      </div>
    </section>
  );
}
