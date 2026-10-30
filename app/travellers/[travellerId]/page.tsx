import TravellerPageClient from '@/components/pages/TravellerPage/TravellerPage';
import css from './TravellerPage.module.css';
import { Metadata } from 'next';
import { getTravellerProfile } from '@/lib/api/clientApi';

export const metadata: Metadata = {
  title: 'TravellerPage',
};

type Props = {
  params: Promise<{ travellerId: string }>;
};

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = await params;

  let initialData = null;
  try {
    initialData = await getTravellerProfile(travellerId, 1, 6);
  } catch (error) {
    console.error('Помилка завантаження профілю мандрівника:', error);
  }

  return (
    <div className={css.page}>
      <main className={css.main}>
        <TravellerPageClient travellerId={travellerId} initialData={initialData} />
      </main>
    </div>
  );
}