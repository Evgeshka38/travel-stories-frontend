import Link from 'next/link';
import css from './NavigationList.module.css';

interface NavigationListProps {
   navItems: string[];
}
export default function NavigationList({ navItems }: NavigationListProps) {
   return (
      <ul className={css.navList}>
         {navItems.map((item) => (
            <li key={item} className={css.navItem}>
               <Link className={css.navLink} href="/">
                  <p className={css.navLinkText}>{item}</p>
               </Link>
            </li>
         ))}
      </ul>
   );
}
