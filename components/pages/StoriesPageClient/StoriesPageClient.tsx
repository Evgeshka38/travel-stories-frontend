'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CategoriesList from '@/components/common/CategoriesList/CategoriesList';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import LoadMoreButton from '@/components/common/LoadMoreButton/LoadMoreButton';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';
import Loader from '@/components/common/Loader/Loader';
import { getStories } from '@/lib/api/clientApi';

import css from './StoriesPageClient.module.css';

const MOBILE_PER_PAGE = 9;
const TABLET_PER_PAGE = 8;
const DESKTOP_PER_PAGE = 9;

function getPerPage(width: number) {
  if (width >= 1440) {
    return DESKTOP_PER_PAGE;
  }

  if (width >= 768) {
    return TABLET_PER_PAGE;
  }

  return MOBILE_PER_PAGE;
}

export default function StoriesPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category');

  const [perPage, setPerPage] = useState<number | null>(null);

  useEffect(() => {
    const updatePerPage = () => {
      setPerPage(getPerPage(window.innerWidth));
    };

    updatePerPage();

    window.addEventListener('resize', updatePerPage);

    return () => {
      window.removeEventListener('resize', updatePerPage);
    };
  }, []);

  const handleCategorySelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }

    const queryString = params.toString();

    router.replace(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false },
    );
  };

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', selectedCategory, perPage],
    queryFn: ({ pageParam }) =>
      getStories(pageParam, perPage ?? MOBILE_PER_PAGE, selectedCategory),
    initialPageParam: 1,
    enabled: perPage !== null,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNextPage ? lastPage.data.page + 1 : undefined,
  });

  const stories = data?.pages.flatMap((page) => page.data.stories) ?? [];

  const isInitialLoading = perPage === null || isLoading;

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Історії Мандрівників</h1>

        <CategoriesList
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />

        {isInitialLoading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}

        {!isInitialLoading && isError && (
          <p className={css.message}>Не вдалося завантажити історії.</p>
        )}

        {!isInitialLoading && !isError && stories.length === 0 && (
          <MessageNoStories
            text="Історій поки немає. Станьте першим, хто поділиться своєю!"
            buttonText="Створити історію"
            href="/stories/create"
          />
        )}

        {stories.length > 0 && perPage !== null && (
          <TravellersStories
            stories={stories}
            variant="save"
            queryKey={['stories', selectedCategory, perPage]}
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