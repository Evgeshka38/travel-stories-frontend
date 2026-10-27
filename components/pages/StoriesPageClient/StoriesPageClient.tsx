'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import CategoriesList from '@/components/common/CategoriesList/CategoriesList';
import { getStories } from '@/lib/api/clientApi';

import css from './StoriesPageClient.module.css';

export default function StoriesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stories', 1, 12, selectedCategory],
    queryFn: () => getStories(1, 12, selectedCategory),
  });

  if (isLoading) {
    return <div className={css.container}>Завантаження історій...</div>;
  }

  if (isError) {
    return <div className={css.container}>Не вдалося завантажити історії.</div>;
  }

  return (
    <div className={css.container}>
      <h1>Історії Мандрівників</h1>

      <CategoriesList
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <TravellersStories stories={data?.data.stories ?? []} />
    </div>
  );
}
