'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CategoriesList from '@/components/common/CategoriesList/CategoriesList';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import LoadMoreButton from '@/components/common/LoadMoreButton/LoadMoreButton';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';
import Loader from '@/components/common/Loader/Loader';
import { getStories } from '@/lib/api/clientApi';

import css from './StoriesPageClient.module.css';

const PER_PAGE = 9;

export default function StoriesPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category');

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
    queryKey: ['stories', selectedCategory],
    queryFn: ({ pageParam }) =>
      getStories(pageParam, PER_PAGE, selectedCategory),
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