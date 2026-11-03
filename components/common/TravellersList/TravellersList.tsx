'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { Traveller } from '@/lib/api/travellersApi';
import css from './TravellersList.module.css';

interface TravellersListProps {
  travellers: Traveller[];
}

interface TravellerAvatarProps {
  avatarUrl?: string | null;
  name: string;
}

function TravellerAvatar({ avatarUrl, name }: TravellerAvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);

  const showPlaceholder = !avatarUrl || hasImageError;

  if (showPlaceholder) {
    return (
      <div
        className={`${css.avatar} ${css.avatarPlaceholder}`}
        aria-label={`Аватар користувача ${name}`}
      >
        {name.trim().charAt(0).toUpperCase() || '?'}
      </div>
    );
  }

  return (
    <Image
      src={avatarUrl}
      alt={name}
      width={112}
      height={112}
      className={css.avatar}
      onError={() => setHasImageError(true)}
    />
  );
}

export default function TravellersList({ travellers }: TravellersListProps) {
  return (
    <ul className={css.list}>
      {travellers.map((traveller) => (
        <li key={traveller._id} className={css.card}>
          <TravellerAvatar
            avatarUrl={traveller.avatarUrl}
            name={traveller.name}
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