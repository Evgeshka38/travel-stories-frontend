import TravellersStoriesItem from '@/components/common/TravellersStoriesItem/TravellersStoriesItem';
import type { PopularStory } from '@/lib/types/stories';
import css from './TravellersStories.module.css';
import type { QueryKey } from '@tanstack/react-query';

type TravellerType = {
  _id: string;
  name: string;
  avatarUrl: string;
};

type Props = {
  stories?: PopularStory[];
  variant?: 'save' | 'edit';
  traveller?: TravellerType;
  queryKey: QueryKey;
};

export default function TravellersStories({
  stories = [],
  variant = 'save',
  traveller,
  queryKey,
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
            ownerAvatarUrl={story.ownerId?.avatarUrl ?? traveller?.avatarUrl ?? ''}
            ownerName={story.ownerId?.name ?? traveller?.name ?? 'Невідомий автор'}
            date={story.date}
            favoriteCount={story.favoriteCount}
            variant={variant}
            queryKey={queryKey}
          />
        </li>
      ))}
    </ul>
  );
}
