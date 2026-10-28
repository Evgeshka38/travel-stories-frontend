'use client';

import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './SavedStoriesPageClient.module.css';
export default function SavedStoriesPageClient() {
  return (
    <div className={css.container}>
      <h2 style={{ color: 'red' }}>SavedStoriesPageClient</h2>
      <TravellersStories stories={[]} variant="save" />
    </div>
  );
}
