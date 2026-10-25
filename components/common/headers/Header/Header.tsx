import Image from 'next/image';
import css from './Header.module.css';
import Link from 'next/link';
import NavigationList from './NavigationList/NavigationList';

interface HeaderProps {
   isAuthenticate?: boolean;
}

export default function Header({ isAuthenticate = false }: HeaderProps) {
   const navLinks = ['Головна', 'Історії', 'Мандрівники'];

   if (isAuthenticate) navLinks.push('Мій Профіль');

   return (
      // <div className={css.wrapper}>
      <div className={css.container}>
         <header className={css.header}>
            <Link className={css.logoLink} href="/">
               <svg className={css.logoIcon} height={22.41} width={22.41}>
                  <use href="/sprite.svg#icon-logo" aria-hidden="true"></use>
               </svg>
               <p className={css.logoText}>Подорожники</p>
            </Link>
            <div className={css.menuControls}>
               <div className={css.storyPublicBtn}></div>
               <div className={css.menuBtn}></div>
            </div>
            <div className={css.menu}>
               <nav className={css.navigation}>
                  <NavigationList navItems={navLinks} />
               </nav>
               <div className={css.authControls}></div>
               <div className={css.userControls}>
                  <div className={css.storyUserBtn}></div>
               </div>
            </div>
         </header>
      </div>
      // </div>
   );
}
