'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import css from './PageToggle.module.css';

export default function PageToggle() {
  const pathname = usePathname();

  return (
    <nav className={css.container} aria-label="Вкладки профілю">
      <Link
        href="/profile/saved"
        className={clsx(css.link, pathname === '/profile/saved' && css.active)}
        aria-current={pathname === '/profile/saved' ? 'page' : undefined}
      >
        Збережені історії
      </Link>

      <Link
        href="/profile/own"
        className={clsx(css.link, pathname === '/profile/own' && css.active)}
        aria-current={pathname === '/profile/own' ? 'page' : undefined}
      >
        Мої історії
      </Link>
    </nav>
  );
}