import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import css from './EditStoryPage.module.css';
import EditStoryPageClient from '@/components/pages/EditStoryPageClient/EditStoryPageClient';
import {
  getCategoriesServer,
  getStoryByIdServer,
} from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'EditStoryPage',
};

type EditStoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStoryPage({
  params,
}: EditStoryPageProps) {
  const { id: storyId } = await params;

  const [story, categories] = await Promise.all([
    getStoryByIdServer(storyId),
    getCategoriesServer(),
  ]);

  if (!story) {
    notFound();
  }

  return (
    <div className={css.page}>
      <main className={css.main}>
        <EditStoryPageClient
          story={story}
          categories={categories}
        />
      </main>
    </div>
  );
}