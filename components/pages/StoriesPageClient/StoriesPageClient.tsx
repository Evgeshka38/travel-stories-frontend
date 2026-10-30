'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import CategoriesList from '@/components/common/CategoriesList/CategoriesList';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import LoadMoreButton from '@/components/common/LoadMoreButton/LoadMoreButton';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';
import { getStories } from '@/lib/api/clientApi';

import css from './StoriesPageClient.module.css';

const PER_PAGE = 9;

export default function StoriesPageClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', selectedCategory],
    queryFn: ({ pageParam }) =>
      getStories(pageParam, PER_PAGE, selectedCategory),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNextPage
        ? lastPage.data.page + 1
        : undefined,
  });

  const stories =
    data?.pages.flatMap((page) => page.data.stories) ?? [];

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Історії Мандрівників</h1>

        <CategoriesList
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {isLoading && <p className={css.message}>Завантаження...</p>}

        {isError && (
          <p className={css.message}>Не вдалося завантажити історії.</p>
        )}

        {!isLoading && !isError && stories.length === 0 && (
          <MessageNoStories 
            text="Історій поки немає. Станьте першим, хто поділиться своєю!"
            buttonText="Назад до історій"
            href="/stories/create"
  />
        )}

        {stories.length > 0 && (
          <TravellersStories
            stories={stories}
            variant="save"
            queryKey={['stories', selectedCategory]}
          />
        )}

        {hasNextPage && (
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          />
        )}
      </div>
    </section>
  );
}