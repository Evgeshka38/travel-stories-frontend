import css from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <h2>Header</h2>
        <div className={css.logo}>
          <Link className={css.navigationLink} href="/">
            Travellers.logo
          </Link>
        </div>
        <nav className={css.navigation}>
          <ul className={css.navigationList}>
            {/* <li className={css.navigationItem}>Structure</li> */}
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
        </nav>
      </header>
    </div>
  );
}
