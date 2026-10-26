'use client';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './StoriesPageClient.module.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/clientApi';
import CategoriesList from '@/components/common/CategoriesList/CategoriesList';


export default function StoriesPageClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div className={css.container}>
      <h1>Історії Мандрівників</h1>

      {isLoading && <p>Завантаження категорій...</p>}

      {isError && <p>Не вдалося завантажити категорії</p>}

      {!isLoading && !isError && (
        <CategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}
      <TravellersStories />
    </div>
  );
}