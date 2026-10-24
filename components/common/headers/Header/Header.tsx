import Image from 'next/image';
import css from './Header.module.css';
import Link from 'next/link';

export default function Header() {
   return (
      <div className={css.container}>
         <header className={css.header}>
            <Link className={css.logoLink} href="/">
               <Image className={css.logoIcon} src="" alt="page icon"></Image>
               <p className={css.logoText}>Подорожники</p>
            </Link>
            <div className={css.menuControls}>
               <div className={css.storyPublicBtn}></div>
               <div className={css.menuBtn}></div>
            </div>
            <div className={css.menu}>
               <nav className={css.navigation}></nav>
               <div className={css.authControls}></div>
               <div className={css.userControls}>
                  <div className={css.storyUserBtn}></div>
               </div>
            </div>
         </header>
      </div>
   );
}
