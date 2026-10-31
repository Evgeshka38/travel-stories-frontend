import Loader from '@/components/common/Loader/Loader';
import css from './Loading.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Завантаження - Подорожники',
  openGraph: {
    title: 'Завантаження - Подорожники',
  },
};

export default function Loading() {
  return (
    <div className={css.wrapper}>
      <Loader />
    </div>
  );
}
