'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import TravellerInfo from '@/components/common/TravellerInfo/TravellerInfo';

export default function ProfileTravellerInfo() {
  const { data: user } = useCurrentUser();

  if (!user) return null;

  return (
    <TravellerInfo
      traveller={{
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl ?? '',
        description: user.description ?? '',
        articlesAmount: user.articlesAmount ?? 0,
      }}
    />
  );
}
