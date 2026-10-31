import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TravellerPageClient from '@/components/pages/TravellerPage/TravellerPage';
import css from './TravellerPage.module.css';
import { getTravellerProfileServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'TravellerPage',
};

type Props = {
  params: Promise<{ travellerId: string }>;
};

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = await params;

  const initialData = await getTravellerProfileServer(
    travellerId,
    1,
    6,
  );

  if (!initialData) {
    notFound();
  }

  return (
    <div className={css.page}>
      <main className={css.main}>
        <TravellerPageClient
          travellerId={travellerId}
          initialData={initialData}
        />
      </main>
    </div>
  );
}