import css from './ProfileLayout.module.css';
import TravellerInfo from '@/components/common/TravellerInfo/TravellerInfo';
import PageToggle from '@/components/common/PageToggle/PageToggle';

interface ProfileLayout {
  children: React.ReactNode;
}

export default async function ProfileLayout({ children }: ProfileLayout) {
  return (
    <div className={css.container}>
      <h1 style={{ color: 'red' }}>ProfileLayout</h1>
      <TravellerInfo />
      <PageToggle />
      {children}
    </div>
  );
}
