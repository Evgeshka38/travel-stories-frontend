import { Metadata } from 'next';
import css from './SavedStoriesPage.module.css';
import SavedStoriesPageClient from '@/components/pages/SavedStoriesPageClient/SavedStoriesPageClient';

export const metadata: Metadata = {
  title: 'SavedStoriesPage',
};
export default function SavedStoriesPage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <SavedStoriesPageClient />
      </main>
    </div>
  );
}
