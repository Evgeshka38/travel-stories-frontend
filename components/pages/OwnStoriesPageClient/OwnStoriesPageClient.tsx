'use client';

import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './OwnStoriesPageClient.module.css';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getOwnStories } from '@/lib/api/clientApi';

export default function OwnStoriesPageClient() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ownStories', page],
    queryFn: () => getOwnStories(page),
  });

  if (isLoading) return <p>Завантаження...</p>;

  if (isError) return <p>Не вдалося завантажити історії</p>;

  const stories = data?.stories ?? [];

  if (stories.length === 0) return <p>У вас поки немає історій</p>;

  return (
    <div className={css.container}>
      <TravellersStories stories={stories} />
      {data?.hasNextPage && (
        <button type="button" onClick={() => setPage(page + 1)}>
          Завантажити ще
        </button>
      )}
    </div>
  );
}
