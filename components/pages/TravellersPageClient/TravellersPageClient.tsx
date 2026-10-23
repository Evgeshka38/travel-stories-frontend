'use client';

import TravellersList from '@/components/common/TravellersList/TravellersList';
import css from './TravellersPageClient.module.css';

export default function TravellersPageClient() {
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>TravellersPageClient</h1>
      <TravellersList />
    </div>
  );
}
