import { Metadata } from 'next';
import css from './EditStoryPage.module.css';
import EditStoryPageClient from '@/components/pages/EditStoryPageClient/EditStoryPageClient';
import { getCategories, getStoryById } from '@/lib/api/clientApi';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'EditStoryPage',
};

type EditStoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { id: storyId } = await params;

  const [story, categories] = await Promise.all([
    getStoryById(storyId).catch((error) => {
      console.log(error);
      throw new Error(error);
    }), //! replace on Server's analog

    getCategories().catch((error) => {
      console.log(error);
      throw new Error(error);
    }), //! replace on Server's analog
  ]);

  if (!story) notFound();

  return (
    <div className={css.page}>
      <main className={css.main}>
        <EditStoryPageClient story={story} categories={categories!} />
      </main>
    </div>
  );
}
