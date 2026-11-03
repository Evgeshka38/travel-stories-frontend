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

function getStoriesPerPage() {
  if (typeof window === 'undefined') {
    return DESKTOP_PER_PAGE;
  }

  if (window.innerWidth >= 768 && window.innerWidth < 1440) {
    return TABLET_PER_PAGE;
  }

  if (window.innerWidth >= 1440) {
    return DESKTOP_PER_PAGE;
  }

  return MOBILE_PER_PAGE;
}

export default function StoriesPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [perPage, setPerPage] = useState(DESKTOP_PER_PAGE);

  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const updatePerPage = () => {
      setPerPage(getStoriesPerPage());
    };

    updatePerPage();
    window.addEventListener('resize', updatePerPage);

    return () => window.removeEventListener('resize', updatePerPage);
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
      getStories(pageParam, perPage, selectedCategory),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNextPage ? lastPage.data.page + 1 : undefined,
  });

  const stories = data?.pages.flatMap((page) => page.data.stories) ?? [];

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Історії Мандрівників</h1>

        <CategoriesList
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />

        {isLoading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}

        {isError && (
          <p className={css.message}>Не вдалося завантажити історії.</p>
        )}

        {!isLoading && !isError && stories.length === 0 && (
          <MessageNoStories
            text="Історій поки немає. Станьте першим, хто поділиться своєю!"
            buttonText="Створити історію"
            href="/stories/create"
          />
        )}

        {stories.length > 0 && (
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
