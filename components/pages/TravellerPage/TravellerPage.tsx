'use client';

import { useParams } from 'next/navigation';
import css from './TravellerPageClient.module.css';
import TarvellerInfo from '@/components/common/TarvellerInfo/TarvellerInfo';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';

export default function TravellerPageClient() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>{`TravellerPageClient id: ${id}`}</h1>
      <TarvellerInfo />
      <TravellersStories />
      <MessageNoStories />
    </div>
  );
}
