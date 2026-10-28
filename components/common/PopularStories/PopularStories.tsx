import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './PopularStories.module.css';
import { useQuery } from '@tanstack/react-query';
import { getPopularStories } from '@/lib/api/clientApi';

export default function PopularStories() {
  const { data: popularStoriesResponse } = useQuery({
    queryKey: ['popularStories', 1, 4],
    queryFn: () => getPopularStories(1, 4),
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>Популярні історії</h2>

      <ul className={css.popularStoriesList}>
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
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
