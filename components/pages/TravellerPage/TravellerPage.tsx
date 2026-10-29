'use client';

import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTravellerProfile } from '@/lib/api/clientApi';
import css from './TravellerPage.module.css';
import TravellerInfo from '@/components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';

type Props = {
  travellerId: string;
  initialData: any;
};

export default function TravellerPageClient({ travellerId, initialData }: Props) {
  const [limit, setLimit] = useState<number>(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setLimit(4);
      } else {
        setLimit(6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['traveller-profile', travellerId, limit],
    queryFn: ({ pageParam = 1 }) => getTravellerProfile(travellerId, pageParam, limit),
    initialPageParam: 1,
    initialData: initialData ? { pages: [initialData], pageParams: [1] } : undefined,
    getNextPageParam: (lastPage: any) => {
      const nextPage = lastPage.page + 1;
      return lastPage.hasNextPage ? nextPage : undefined;
    },
    select: (result) => ({
      traveller: result.pages[0]?.traveller,
      stories: result.pages.flatMap((page: any) => page.stories),
    }),
  });

  const traveller = data?.traveller;
  const stories = data?.stories ?? [];
  const hasStories = stories.length > 0;

  return (
    <>
      {}
      <section className={css.headerSection}>
        <div className={css.container}>
          <TravellerInfo traveller={traveller} />
        </div>
      </section>

      {}
      <section className={css.blogSection}>
        <div className={css.container}>
          <h2 className={css.sectionTitle}>Історії Мандрівника</h2>

          {hasStories ? (
            <>
              <div className={css.content}>
                <TravellersStories stories={stories} variant="save" traveller={traveller} />
              </div>

              {hasNextPage && (
                <button
                  className={css.loadMoreButton}
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
                </button>
              )}
            </>
          ) : (
            <MessageNoStories />
          )}
        </div>
      </section>
    </>
  );
}