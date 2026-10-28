import css from './TravellersStories.module.css';
import TravellersStoriesItem from '@/components/common/TravellersStoriesItem/TravellersStoriesItem';
import { Story } from '@/lib/types/stories';

type Props = {
  stories: Story[];
  variant: 'save' | 'edit';
};

export default function TravellersStories({ stories, variant }: Props) {
  return (
     <ul className={css.list}>
      {stories.map(story => (
        <li key={story._id} className={css.item}>
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
            variant={variant}
          />
        </li>
      ))}
    </ul>
  );
}