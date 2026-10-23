import TravellerPageClient from '@/components/pages/TravellerPage/TravellerPage';
import css from './TravellerPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TravellerPage',
};

type Props = {
  params: Promise<{ travellerId: string }>;
};

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = await params;

  return (
    <div className={css.page}>
      <main className={css.main}>
        <TravellerPageClient travellerId={travellerId} />
      </main>
    </div>
  );
}
