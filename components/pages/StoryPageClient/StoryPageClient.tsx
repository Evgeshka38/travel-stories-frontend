'use client';

import css from './StoryPageClient.module.css';
import StoryDetails from './StoryDetails/StoryDetails';
import PopularStories from '@/components/common/PopularStories/PopularStories';

type Props = {
  storyId: string;
};

export default function StoryPageClient({ storyId }: Props) {
  return (
    <div className={css.container}>
      <StoryDetails storyId={storyId} />
      <section className={css.popular}>
        <PopularStories />
      </section>
    </div>
  );
}
