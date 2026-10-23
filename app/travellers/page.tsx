import { Metadata } from 'next';
import css from './TravellersPage.module.css';
import TravellersPageClient from '@/components/pages/TravellersPageClient/TravellersPageClient';

export const metadata: Metadata = {
  title: 'TravellersPage',
};

export default async function TravellersPage() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <TravellersPageClient />
      </main>
    </div>
  );
}
