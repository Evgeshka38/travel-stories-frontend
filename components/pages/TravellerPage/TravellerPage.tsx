'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getTravellerProfile } from '@/lib/api/clientApi';
import { TravellerProfileResponse } from '@/lib/types/stories';
import css from './TravellerPage.module.css';
import TravellerInfo from '@/components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';

type Props = {
  travellerId: string;
  initialData: TravellerProfileResponse | null;
};

const LIMIT = 6;

export default function TravellerPageClient({ travellerId, initialData }: Props) {
  const queryKey = ['traveller-profile', travellerId];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => getTravellerProfile(travellerId, pageParam, LIMIT),
    initialPageParam: 1,
    initialData: initialData ? { pages: [initialData], pageParams: [1] } : undefined,
    getNextPageParam: (lastPage: TravellerProfileResponse) => {
      const nextPage = lastPage.page + 1;
      return lastPage.hasNextPage ? nextPage : undefined;
    },
    select: (result) => ({
      traveller: result.pages[0]?.traveller,
      stories: result.pages.flatMap((page) => page.stories),
    }),
  });

  const traveller = data?.traveller;
  const stories = data?.stories ?? [];
  const hasStories = stories.length > 0;

  return (
    <>
      <section className={css.headerSection}>
        <div className={css.container}>
          <TravellerInfo traveller={traveller} />
        </div>
      </section>

      <section className={css.blogSection}>
        <div className={css.container}>
          <h1 className={css.sectionTitle}>Історії Мандрівника</h1>

          {hasStories ? (
            <>
              <div className={css.content}>
                <TravellersStories
                  stories={stories}
                  variant="save"
                  traveller={traveller}
                  queryKey={queryKey}
                />
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
            <MessageNoStories
              text="Цей користувач ще не публікував історій"
              buttonText="До історій"
              href="/stories"
            />
          )}
        </div>
      </section>
    </>
  );
}