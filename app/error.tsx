'use client';

import Link from 'next/link';
import css from './Error.module.css';
import { usePathname } from 'next/navigation';

type Props = {
  error: Error;
  reset?: () => void;
};
export default function Error({ error, reset }: Props) {
  const pathname = usePathname();

  return (
    <div className={css.wrapper}>
      <h2>Помилка</h2>

      <p className={css.errorMessage}>{error.name}</p>
      <p className={css.errorMessage}>{error.message}</p>

      <button className={css.button} onClick={reset}>
        Спробувати ще
      </button>

      {pathname !== '/' && (
        <Link href="/" className={css.link} aria-label="Певернутися на головну">
          Певернутися на головну
        </Link>
      )}
    </div>
  );
}
