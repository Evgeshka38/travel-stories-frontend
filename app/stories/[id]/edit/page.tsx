import { Metadata } from 'next';
import css from './EditStoryPage.module.css';
import EditStoryPageClient from '@/components/pages/EditStoryPageClient/EditStoryPageClient';

export const metadata: Metadata = {
  title: 'EditStoryPage',
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditStoryPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className={css.page}>
      <main className={css.main}>
        <EditStoryPageClient storyId={id} />
      </main>
    </div>
  );
}
