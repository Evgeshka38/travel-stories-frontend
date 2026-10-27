import TravellersStoriesItem from '@/components/common/TravellersStoriesItem/TravellersStoriesItem';
import type { PopularStory } from '@/lib/types/stories';
import css from './TravellersStories.module.css';

type Props = {
  stories: PopularStory[];
};

export default function TravellersStories({ stories }: Props) {
  return (
    <div className={css.container}>
      {stories.map((story) => (
        <TravellersStoriesItem
          key={story._id}
          id={story._id}
          imgUrl={story.img}
          categoryName={story.category?.name ?? 'Без категорії'}
          title={story.title}
          article={story.article}
          ownerAvatarUrl={story.ownerId?.avatarUrl ?? ''}
          ownerName={story.ownerId?.name ?? 'Невідомий автор'}
          date={story.date}
          favoriteCount={story.favoriteCount}
          variant="save"
        />
      ))}
    </div>
  );
}
