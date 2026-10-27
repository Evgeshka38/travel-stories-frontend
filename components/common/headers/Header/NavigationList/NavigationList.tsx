import Link from 'next/link';
import css from './NavigationList.module.css';
import { NavLink } from '@/types/link';
import clsx from 'clsx';

interface NavigationListProps {
  navItems: NavLink[];
  isHomePage: boolean;
  onClick: () => void;
}
export default function NavigationList({
  navItems,
  isHomePage,
  onClick,
}: NavigationListProps) {
  return (
    <div className={clsx(css.container, isHomePage && css.homePageStyles)}>
      <ul className={css.navList}>
        {navItems.map(({ linkRoute, linkText }) => (
          <li key={linkRoute} className={css.navItem}>
            <Link
              className={clsx(css.navLink, isHomePage && css.homePageStyles)}
              href={linkRoute}
              aria-label={linkText}
              onClick={onClick}
            >
              <p className={css.navLinkText}>{linkText}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
