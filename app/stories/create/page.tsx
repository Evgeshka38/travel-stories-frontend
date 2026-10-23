import { Metadata } from 'next';
import css from './AddStoryPage.module.css';
import AddStoryPageClient from '@/components/pages/AddStoryPageClient/AddStoryPageClient';

export const metadata: Metadata = {
  title: 'AddStoryPage',
};

export default async function AddStoryPage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <AddStoryPageClient />
      </main>
    </div>
  );
}
