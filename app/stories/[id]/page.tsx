import css from './StoryPage.module.css';
import StoryPageClient from '@/components/pages/StoryPageClient/StoryPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StoryPage',
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className={css.page}>
      <main className={css.main}>
        <StoryPageClient storyId={id} />
      </main>
    </div>
  );
}
