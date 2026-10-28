import TravellersStoriesItem from '@/components/common/TravellersStoriesItem/TravellersStoriesItem';
import type { PopularStory } from '@/lib/types/stories';

import css from './TravellersStories.module.css';

type Props = {
  stories?: PopularStory[];
  variant?: 'save' | 'edit';
};

export default function TravellersStories({
  stories = [],
  variant = 'save',
}: Props) {
  return (
    <ul className={css.list}>
      {stories.map((story) => (
        <li key={story._id} className={css.item}>
          <TravellersStoriesItem
            id={story._id}
            imgUrl={story.img}
            categoryName={story.category?.name ?? 'Без категорії'}
            title={story.title}
            article={story.article}
            ownerAvatarUrl={story.ownerId?.avatarUrl ?? ''}
            ownerName={story.ownerId?.name ?? 'Невідомий автор'}
            date={story.date}
            favoriteCount={story.favoriteCount}
            variant={variant}
          />
        </li>
      ))}
    </ul>
  );
}