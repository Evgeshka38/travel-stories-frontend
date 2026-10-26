import clsx from 'clsx';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './PopularStories.module.css';
import { PopularStory } from '@/lib/types/stories';
import { popularStoriesResponseMock } from './popularStoriesResponseMock';

const popularStories: PopularStory[] = popularStoriesResponseMock.data.stories;

export default function PopularStories() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Популярні історії</h2>

      <ul className={css.popularStoriesList}>
        {popularStories.map((story) => (
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
            />
          </li>
        ))}

        {/* todo css nth child */}
        {/* <li className={clsx(css.popularStoriesListItem, css.tabletOnly)}>
          <TravellersStoriesItem />
        </li> */}
      </ul>
    </div>
  );
}
