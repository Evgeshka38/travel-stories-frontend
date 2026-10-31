'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import TravellersList from '@/components/common/TravellersList/TravellersList';
import { getTravellers } from '@/lib/api/travellersApi';
import css from './TravellersPageClient.module.css';
import Loader from '@/components/common/Loader/Loader';

export default function TravellersPageClient() {
  const [initialLimit, setInitialLimit] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setInitialLimit(12);
      } else {
        setInitialLimit(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    data,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['travellers', initialLimit],
    queryFn: ({ pageParam }) => {
      const limit = pageParam === 1 ? (initialLimit ?? 8) : 4;
      return getTravellers(pageParam, limit);
    },
    initialPageParam: 1,
    enabled: initialLimit !== null,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + lastPage.perPage / 4;
      return lastPage.hasNextPage ? nextPage : undefined;
    },
    select: (result) => ({
      ...result,
      travellers: result.pages.flatMap((page) => page.users),
    }),
  });

  return (
    <section className={css.container}>
      <h1 className={css.title}>Мандрівники</h1>

      {initialLimit === null || (isPending && !data) ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : isError && !data ? (
        <p>Не вдалося завантажити мандрівників.</p>
      ) : (
        <>
          <TravellersList travellers={data?.travellers ?? []} />

          {hasNextPage && (
            <button
              className={css.loadMore}
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
            </button>
          )}
        </>
      )}
    </section>
  );
}
