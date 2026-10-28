'use client';

import css from './TravellerPage.module.css';
import TravellerInfo from '@/components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/common/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/common/MessageNoStories/MessageNoStories';

type Props = {
  travellerId: string;
};

export default function TravellerPageClient({ travellerId }: Props) {
  return (
    <div className={css.container}>
      <h1>{`Traveller profile: ${travellerId}`}</h1>
      <TravellerInfo />
      <TravellersStories stories={[]} variant="save" />
      <MessageNoStories 
         text="Цей користувач ще не публікував історій"
         buttonText="До історій"
         href="/stories"
  />
    </div>
  );
}
