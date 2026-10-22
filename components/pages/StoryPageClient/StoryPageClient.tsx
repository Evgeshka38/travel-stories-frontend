'use client';

import { useParams } from 'next/navigation';
import css from './StoryPageClient.module.css';
import StoryDetails from './StoryDetails/StoryDetails';
import PopularStories from '@/components/common/PopularStories/PopularStories';

export default function StoryPageClient() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>{`StoryPageClient id: ${id}`}</h1>
      <StoryDetails />
      <PopularStories />
    </div>
  );
}
