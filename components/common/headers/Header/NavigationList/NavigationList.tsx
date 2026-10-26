import Link from 'next/link';
import css from './NavigationList.module.css';
import { NavLink } from '@/types/link';

interface NavigationListProps {
  navItems: NavLink[];
}
export default function NavigationList({ navItems }: NavigationListProps) {
  return (
    <div className={css.container}>
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
