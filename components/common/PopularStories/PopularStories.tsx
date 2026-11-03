'use client';

import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './PopularStories.module.css';
import { useQuery } from '@tanstack/react-query';
import { getPopularStories } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function PopularStories() {
  const pathname = usePathname();
  const storyIdPageRegex = /^\/stories\/[a-f0-9]{24}$/;
  const isStoryIdPage = storyIdPageRegex.test(pathname);

  const { data: popularStoriesResponse, isLoading } = useQuery({
    queryKey: ['popularStories', 1, 4],
    queryFn: () => getPopularStories(1, 4),
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>Популярні історії</h2>

      {isLoading && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}

      <ul
        className={clsx(
          css.popularStoriesList,
          isStoryIdPage && css.popularStoriesListOnStoryIdPage,
        )}
      >
        {popularStoriesResponse?.data.stories &&
          popularStoriesResponse.data.stories.map((story) => (
            <li key={story._id} className={css.popularStoriesListItem}>
              <TravellersStoriesItem
                id={story._id}
                imgUrl={story.img}
                categoryName={story.category.name}
                title={story.title}
                article={story.article}
                ownerAvatarUrl={story.ownerId.avatarUrl}
                ownerName={story.ownerId.name}
                date={story.date}
                favoriteCount={story.favoriteCount}
                variant="save"
                queryKey={['popularStories', 1, 4]}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
