import Link from 'next/link';
import css from './NavigationList.module.css';

export default function NavigationList() {
   return (
      <ul className={css.navigationList}>
         <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
               Home
            </Link>
         </li>
         <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/stories">
               Stories
            </Link>
         </li>
      </ul>
   );
}
