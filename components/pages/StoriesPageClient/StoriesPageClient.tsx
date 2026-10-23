'use client';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import css from './StoriesPageClient.module.css';
export default function StoriesPageClient() {
  return (
    <div className={css.container}>
      <h2 style={{ color: 'red' }}>StoriesPageClient</h2>
      <TravellersStories />
    </div>
  );
}
