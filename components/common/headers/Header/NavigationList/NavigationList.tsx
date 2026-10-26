import Link from 'next/link';
import css from './NavigationList.module.css';
import { NavLink } from '@/types/link';
import clsx from 'clsx';

interface NavigationListProps {
  navItems: NavLink[];
  isHomePage: boolean;
}
export default function NavigationList({
  navItems,
  isHomePage,
}: NavigationListProps) {
  return (
    <div className={clsx(css.container, isHomePage && css.homePageStyles)}>
      <ul className={css.navList}>
        {navItems.map(({ linkRoute, linkText }) => (
          <li key={linkRoute} className={css.navItem}>
            <Link
              className={css.navLink}
              href={linkRoute}
              aria-label={linkText}
            >
              <p className={css.navLinkText}>{linkText}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
