import { Metadata } from 'next';
import css from './StoriesPage.module.css';
import StoriesPageClient from '@/components/pages/StoriesPageClient/StoriesPageClient';

export const metadata: Metadata = {
  title: 'StoriesPage',
};

export default async function StoriesPage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <StoriesPageClient />
      </main>
    </div>
  );
}
