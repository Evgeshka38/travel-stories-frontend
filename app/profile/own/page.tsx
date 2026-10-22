import OwnStoriesPageClient from '@/components/pages/OwnStoriesPageClient/OwnStoriesPageClient';
import css from './OwnStoriesPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OwnStoriesPage',
};

export default function OwnStoriesPage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <OwnStoriesPageClient />
      </main>
    </div>
  );
}
