import Link from 'next/link';
import css from './ProfileLayout.module.css';
import ProfileTravellerInfo from '@/components/common/ProfileTravellerInfo/ProfileTravellerInfo';
import PageToggle from '@/components/common/PageToggle/PageToggle';

interface ProfileLayout {
  children: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayout) {
  return (
    <div className={css.container}>
      <ProfileTravellerInfo />
      <div className={css.tabsRow}>
      <PageToggle />
       <Link href="/profile/edit" className={css.editLink}>
        Редагувати профіль
      </Link>
      </div>
      {children}
    </div>
  );
}
