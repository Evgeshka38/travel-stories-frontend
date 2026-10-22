'use client';

import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './OwnStoriesPageClient.module.css';
export default function OwnStoriesPageClient() {
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>OwnStoriesPageClient</h1>
      <TravellersStories />
    </div>
  );
}
