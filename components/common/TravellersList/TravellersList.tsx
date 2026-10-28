import Image from 'next/image';
import Link from 'next/link';
import type { Traveller } from '@/lib/api/travellersApi';
import css from './TravellersList.module.css';

interface TravellersListProps {
  travellers: Traveller[];
}

export default function TravellersList({ travellers }: TravellersListProps) {
  return (
    <ul className={css.list}>
      {travellers.map((traveller) => (
        <li key={traveller._id} className={css.card}>
          <Image
            src={traveller.avatarUrl}
            alt={traveller.name}
            width={112}
            height={112}
            className={css.avatar}
          />

          <h2 className={css.name}>{traveller.name}</h2>
          <p className={css.description}>{traveller.description}</p>

          <Link href={`/travellers/${traveller._id}`} className={css.link}>
            Переглянути профіль
          </Link>
        </li>
      ))}
    </ul>
  );
}
