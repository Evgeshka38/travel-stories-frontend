'use client';

import { useState } from 'react';

import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import CategoriesList from '@/components/common/CategoriesList/CategoriesList';

import css from './StoriesPageClient.module.css';

export default function StoriesPageClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  return (
    <div className={css.container}>
      <h1>Історії Мандрівників</h1>

      <CategoriesList
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <TravellersStories stories={[]} variant="save" />
    </div>
  );
}