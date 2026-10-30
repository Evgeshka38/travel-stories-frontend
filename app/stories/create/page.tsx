import { Metadata } from 'next';
import css from './AddStoryPage.module.css';
import AddStoryPageClient from '@/components/pages/AddStoryPageClient/AddStoryPageClient';
import { getCategories } from '@/lib/api/clientApi';

export const metadata: Metadata = {
  title: 'AddStoryPage',
};

export default async function AddStoryPage() {
  const categories = await getCategories().catch((error) => {
    console.log(error);
    throw Error(error);
  }); //! replace on Server's analog

  return (
    <div className={css.page}>
      <main className={css.main}>
        <AddStoryPageClient categories={categories} />
      </main>
    </div>
  );
}
