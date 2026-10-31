import type { Metadata } from 'next';

import css from './AddStoryPage.module.css';
import AddStoryPageClient from '@/components/pages/AddStoryPageClient/AddStoryPageClient';
import { getCategoriesServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Публікація історії - Подорожники',
  openGraph: {
    title: 'Публікація історії - Подорожники',
  },
};

export default async function AddStoryPage() {
  const categories = await getCategoriesServer();

  return (
    <div className={css.page}>
      <main className={css.main}>
        <AddStoryPageClient categories={categories} />
      </main>
    </div>
  );
}
