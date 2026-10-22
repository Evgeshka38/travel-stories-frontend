import TravellerPageClient from '@/components/pages/TravellerPage/TravellerPage';
import css from './TravellerPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TravellerPage',
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TravellerPage({ params }: Props) {
  const { id } = await params;
  console.log(id);
  return (
    <div className={css.page}>
      <main className={css.main}>
        <TravellerPageClient />
      </main>
    </div>
  );
}
